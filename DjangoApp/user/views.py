from rest_framework import viewsets, status
from rest_framework.views import APIView  
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from user.models import USERS
from .serializers import UserSerializer,UserLoginSerializer


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
        
        return Response({"message": "ok"}, status=status.HTTP_200_OK)
            

        
        

           

