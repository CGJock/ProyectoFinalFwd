from rest_framework import viewsets, status
from rest_framework.views import APIView  
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from user.models import USERS
from student.models import STUDENT
from student.serializers import StudentSerializer
from psychologist.serializers import  PsychologistSerializer
from rest_framework import serializers


from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
import random,string


from grade.models import GRADE
from instituto.models import  INSTITUTIONS
from psychologist.models import PSYCHOLOGIST


from .serializers import UserSerializer,UserLoginSerializer,DeleteUserSerializer,ResetPasswordSerializer
import jwt, datetime



class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()  # Define el queryset para evitar el error
    serializer_class = UserSerializer
    
    def generate_password(self):
            length = random.randint(8, 32)
            characters = string.ascii_letters + string.digits + string.punctuation
            return ''.join(random.choice(characters) for _ in range(length))
    
    
    def create(self, request):
       
        generated_password = self.generate_password()
       
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
            # "password":generated_password,
            "phone_number":request.data.get('phone_number')
        }
        user_serializer = UserSerializer(data=user_data)
        
        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.save()
            user.password = make_password(generated_password)  # Hashear y asignar la contraseña
            user.save()
            
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

                
            #se encripta el link 
            encoded_pk = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)
            # url = f"http://localhost:8000/reset-password/{encoded_pk}/{token}/"
            url = f"http://localhost:8000/api/user/reset-password/"
            
            return Response({
                "email": user.email,
                "username": user.username,
                "password": generated_password,
                "reset_url": url,
                'isActive' :user.is_active
                })
                
              
           
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
            raise AuthenticationFailed("El email no existe")
        
        if not user.check_password(password):
            raise AuthenticationFailed("contrasenna incorrecta")
        
        # se setan las propiedades del payload
        payload = {
            "id_user": user.id_user,
            'id_rol' : user.id_rol.id_rol,
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
    

class LogOutUserView(viewsets.ViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
    def create(self,request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message' : "sesion borrada"
        }
        return Response
  

      
            
    #para autentificar el estudiante       
class UserViewSet(viewsets.ModelViewSet):
   queryset =  USERS.objects.all()
   serializer_class = UserLoginSerializer
   
   def get(self,request):
        token = request.COOKIES.get('jwt')
       
        if not token:
           raise AuthenticationFailed("no autentificado")
        try:
           payload = jwt.decode(token, 'secret', algorithm='HS256')
           
        except jwt.ExpiredSignatureError :
            raise AuthenticationFailed("no autentificado")
        
        user =  USERS.objects.filter(id_user=payload['id_user']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)
    


class DeleteUser(viewsets.ModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = DeleteUserSerializer
    
    def destroy(self, request, pk):
        # Obtiene la cookie del request
        user_cookie = request.COOKIES.get('jwt')
        
        if not user_cookie:
            return Response({"message": "Acción no permitida"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Intenta decodificar el token JWT
        try:
            decoded_cookie = jwt.decode(user_cookie, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response({"detail": "El token ha expirado"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"detail": "Formato de token invalido"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Obtén el id_rol de la cookie decodificada
        id_rol = decoded_cookie.get('id_rol')
        
        
        # Verifica si el id_rol es válido y si tiene el valor 1 (rol de administrador)
        if not id_rol or id_rol != 1:
            return Response({'detail': 'No autorizado para eliminar este recurso',"id_rol":id_rol}, status=status.HTTP_403_FORBIDDEN)
        
        # Si el id_rol es 1, intenta obtener y eliminar el usuario
        try:
            instance = USERS.objects.get(pk=pk)
        except USERS.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Elimina el usuario
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    

class ResetPasswordView(viewsets.ModelViewSet):
        queryset = USERS.objects.all() 
        serializer_class = ResetPasswordSerializer
        
        def update(self,request,pk=None):
            token = request.COOKIES.get('jwt')
            if not token:
                raise AuthenticationFailed("No Autentificado")
            try:
                payload = jwt.decode(token, 'secret', algorithm='HS256')
           
            except jwt.ExpiredSignatureError :
                raise AuthenticationFailed("Autentificacion Expirada")
        
            user =  USERS.objects.filter(pk=payload['id_user']).first()
            if not user:
                raise  AuthenticationFailed("no autentificado")

            serializer = ResetPasswordSerializer(user, data=request.data)
            if serializer.is_valid():
                user.password = make_password(serializer.validated_data['new_password'])
                user.save()
                return Response({"message": "Contraseña actualizada correctamente."})
        
            return Response(serializer.errors, status=400)
            
            
            
            
       
    
    
    





        
        

           

