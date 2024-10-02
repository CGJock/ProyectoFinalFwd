from rest_framework import viewsets, status
from rest_framework.views import APIView  
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from user.models import USERS
from .serializers import UserSerializer,UserLoginSerializer
import jwt, datetime



class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class UserListView(viewsets.ReadOnlyModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
    
class LoginUserViewSet(viewsets.ViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserLoginSerializer
    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
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

      
        # return Response({'jwt': token}, status=status.HTTP_200_OK)
            
            
class UserViewSet(viewsets.ModelViewSet):
   queryset =  USERS.objects.all()
   serializer_class = UserLoginSerializer
   
   def create(self,request):
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



        
        

           

