from rest_framework import viewsets, status
from rest_framework.views import APIView  
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password
from user.models import USERS
from student.models import STUDENT
from student.serializers import StudentSerializer
from psychologist.serializers import  PsychologistSerializer
import json

from grade.models import GRADE
from instituto.models import  INSTITUTIONS
from psychologist.models import PSYCHOLOGIST


from .serializers import UserSerializer,UserLoginSerializer,DeleteUserSerializer
import jwt, datetime



class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()  # Define el queryset para evitar el error
    serializer_class = UserSerializer
    def create(self, request):
        user_data = {
            'id_rol': request.data.get('id_rol'),
            'dni_number':request.data.get('dni_number'),
            "sex":request.data.get('sex'),
            "username":request.data.get('username'),
            "birth_date":request.data.get('birth_date'),
            "name":request.data.get('name'),
            "first_name":request.data.get('first_name'),
            "last_name":request.data.get('last_name'),
            "email":request.data.get('email'),
            "password":make_password(request.data.get('password')),
            "phone_number":request.data.get('phone_number')
        }
        user_serializer = UserSerializer(data=user_data)
        
        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.save()
            
            if request.data.get('id_rol') == 2:
               student_data = {
                "government_subsidy":request.data.get("government_subsidy"),
                "scholarship":request.data.get("scholarship"),  
               }
               grade = GRADE.objects.get(id_grade = request.data.get("id_grade"))
               institution = INSTITUTIONS.objects.get(id_institution =request.data.get("id_institution"))
               
               student = STUDENT.objects.create(id_user = user, id_grade = grade, id_institution = institution,**student_data)
               
               student_serializer = StudentSerializer(student)
               return Response({
                   "user": user_serializer.data,
                   "student":student_serializer.data

               },status=status.HTTP_201_CREATED)
               
            elif request.data.get('id_rol') == 3:
                psychologist_data  = {
                    'license_code': request.data.get('license_code'),
                    'availability': request.data.get('availability'),
                    'years_experience' : request.data.get('years_experience')
                }
                
                
                
                psychologist = PSYCHOLOGIST.objects.create(id_user = user,**psychologist_data)
               
                psychologist_serializer =  PsychologistSerializer(psychologist)
                
                return Response({
                    "user": user_serializer.data,
                    "psychologist":psychologist_serializer.data
                },status=status.HTTP_201_CREATED)

           
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#se muestran todos los ususarios
class UserListView(viewsets.ReadOnlyModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
 
 
 #clase para setear la cooki con el hash   
class LoginUserViewSet(viewsets.ViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserLoginSerializer
    def create(self, request):
        email = request.data['email']
        password = request.data['password']
        print(password,email)
        user = USERS.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed("User not found")
        
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")
        
        # se setan las propiedades del payload
        payload = {
            "id_user": user.id_user,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=120),#se setea el vencimiento del token
            "iat" : datetime.datetime.utcnow()
        }
        
        #se encripta el token 
        token =  jwt.encode(payload, "secret", algorithm="HS256")
        
        response = Response()
        
        response.set_cookie('jwt', value=token, httponly=True)#se setea la cookie
        
        response.data = {
            'jwt': token
        }
        return response

      
            
           
class UserViewSet(viewsets.ModelViewSet):
   queryset =  USERS.objects.all()
   serializer_class = UserLoginSerializer
   
   def get(self,request):
        token = request.COOKIES.get('jwt')
       
        if not token:
           raise AuthenticationFailed("no autentificado")
        try:
           token = jwt.decode(token, 'secret', algorithm='HS256')
           
        except jwt.ExpiredSignatureError :
            raise AuthenticationFailed("no autentificado")
        
        user =  USERS.objects.filter(id_user=token['id_user']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)
    

class DeleteUser(viewsets.ModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = DeleteUserSerializer
    
    def delete(self,request,pk):
        user_cookie = request.COOKIES.get('jwt')
        
        if not user_cookie:
            return Response({"message": "accion no permitida"},status=status.HTTP_400_BAD_REQUEST)
        try:
            cookie_dict = json.loads(user_cookie)
        except json.JSONDecodeError:
            return Response({"detail":"invalid cookie format"},status=status.HTTP_400_BAD_REQUEST)
        
        # user_id_cookie = cookie_dict.get['id_user']
        user_id_cookie = cookie_dict.get('id_rol')
        
        try:
        
            instance = USERS.objects.get(pk=pk)
            
        # Compara el id de la cookie con el id del usuario del modelo
            if int(user_id_cookie) != 2:
                return Response({'detail': 'Unauthorized to delete this resource'}, status=status.HTTP_403_FORBIDDEN)
        except USERS.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
        

        

    
    
    





        
        

           

