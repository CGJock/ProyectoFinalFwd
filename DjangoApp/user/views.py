from rest_framework import viewsets, status
from rest_framework.views import APIView  
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from user.models import USERS
from student.models import STUDENT
from student.serializers import StudentSerializer
from psychologist.serializers import  PsychologistSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny 


from rest_framework_simplejwt.views import TokenRefreshView

 


from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
import random,string


from grade.models import GRADE
from instituto.models import  INSTITUTIONS
from psychologist.models import PSYCHOLOGIST


from .serializers import UserSerializer,UserLoginSerializer,DeleteUserSerializer,ResetPasswordSerializer,CustomTokenObtainPairSerializer
from datetime import timedelta,datetime
from django.shortcuts import get_object_or_404


class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()  # Define el queryset para evitar el error
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    
    #funcioin que se encarga de crear una contrasenna para el usuario
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
            "phone_number":request.data.get('phone_number')
        }
        user_serializer = UserSerializer(data=user_data)
        
        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.save()
            user.password = make_password(generated_password)  # Hashear y asignar la contraseña
            user.save()
            
            #dependiento del id_rol se creara un nuevo objeto estudiante o psycologo
            if int(request.data.get('id_rol')) == 2:
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
                    "password": generated_password,
                   "student":student_serializer.data

               },status=status.HTTP_201_CREATED)
               
            elif int(request.data.get('id_rol')) == 3:
                psychologist_data  = {
                    'license_code': request.data.get('license_code'),
                    'availability': request.data.get('availability'),
                    'pacient_count': request.data.get('pacient_count'),
                    'years_experience' : request.data.get('years_experience'),
                    'assigned_to_hotline' : request.data.get('assigned_to_hotline')
                }
                
                
                
                psychologist = PSYCHOLOGIST.objects.create(id_user = user,**psychologist_data)
               
                psychologist_serializer =  PsychologistSerializer(psychologist)
                #se guardan los datos en la respuesta que se le enviara al usuario
                return Response({
                    "user": user_serializer.data,
                    "password": generated_password,
                    "psychologist":psychologist_serializer.data
    
                },status=status.HTTP_201_CREATED)

            
            return Response({
                "email": user.email,
                "username": user.username,
                "password": generated_password,
                'isActive' :user.is_active
                })
                
              
           
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EditUserView(viewsets.ModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
    authentication_classes = []
    
    def partial_update(self, request, *args, **kwargs):
        # Obtener el usuario basado en el id_user
        id_user = request.data.get('id_user')
        user = get_object_or_404(USERS, id_user=id_user)  # Usa get_object_or_404 para manejar mejor el error

        
        user_data = {
            'dni_number': request.data.get('dni_number'),
            "sex": request.data.get('sex'),
            "username": request.data.get('username'),
            "birth_date": request.data.get('birth_date'),
            "name": request.data.get('name'),
            "first_name": request.data.get('first_name'),
            "last_name": request.data.get('last_name'),
            "email": request.data.get('email'),
            "phone_number": request.data.get('phone_number'),
            'is_active': request.data.get('is_active'),
        
        }
        
        # se innicialize el objeto
        user_serializer = UserSerializer(user, data=user_data, partial=True)
        
        # Validar y guardar
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()  # Guarda los cambios en el usuario existente
            return Response(user_serializer.data, status=status.HTTP_200_OK)  # Devuelve los datos del usuario actualizado

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST) #los datos no se procesaron de manera correcta
    

class DeleteUserView(viewsets.ModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = DeleteUserSerializer
    permission_classes = []
    authentication_classes = []
    #DESTROY para eliminar
    def partial_update(self, request, *args, **kwargs):
       # Obtener el usuario basado en el id_user
        id_user = request.data.get('id_user')
        user = get_object_or_404(USERS, id_user=id_user)  # Usa get_object_or_404 para manejar mejor el error

        
        user_data = {
            'is_active': request.data.get('is_active'),
        }
        
        # se innicialize el objeto
        user_serializer = UserSerializer(user, data=user_data, partial=True)
        
        # Validar y guardar
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()  # Guarda los cambios en el usuario existente
            return Response(user_serializer.data, status=status.HTTP_200_OK)  # Devuelve los datos del usuario actualizado

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST) #los datos no se procesaron de manera correcta
    
    
    
    
   
#se muestran todos los ususarios
class UserListView(viewsets.ReadOnlyModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
    
    permission_classes = [AllowAny] 
    authentication_classes = []
    
    
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class LoginUserViewSet(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer 
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh_token = response.data.get('refresh')
        # Set the refresh token as an HTTP-only cookie
        if refresh_token:
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,  # se utilizan secure cookies en produccion
                samesite='Lax',  
                expires=datetime.now() + timedelta(days=7)  # tiempo duracion de la cookie
            )
            # se puede remover el refresh del body
            del response.data['refresh']
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
  

      
            
#para autentificar al usuario(admin)      
class UserViewSet(APIView):
    permission_classes = []
    permission_classes = [AllowAny]
    def get(self,request,id_user):
        try:
            user = USERS.objects.get(id_user=id_user)
            serializer = UserSerializer(user) 
            return Response(serializer.data,status=200)
        except USERS.DoesNotExist:
            return Response({'error': 'no se encontro el user'}, status=404)
    
       
       
           




    

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
            
            
            
            
       
 #view para refrescar el token    
class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    authentication_classes = []  # No requiere autenticación para refrescar

    def post(self, request, *args, **kwargs):
        # Obtiene el refresh token de la cookie HTTP-only
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"detail": "No hay refresh token disponible."}, status=400)

        # Llame al método padre para refrescar el token
        request.data['refresh'] = refresh_token
        return super().post(request, *args, **kwargs)
    
    





        
        

           

