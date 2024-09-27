from rest_framework import viewsets
from .models import Post, User, PostResponse
from .serializers import PostSerializer, UserSerializer, PostResponseSerializer

class userViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostResponseViewSet(viewsets.ModelViewSet):
    queryset = PostResponse.objects.all()  
    serializer_class = PostResponseSerializer