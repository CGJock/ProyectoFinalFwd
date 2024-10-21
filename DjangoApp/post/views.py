from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets,  status
from post.models import Post, PostReplies
from user.models import USERS
from .serializers import PostSerializer, PostResponseSerializer
from user.serializers import UserSerializer
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import requests

# queryset = Consulta de todos los usuarios en la base de datos.
# serializer_class= Clase del serializador utilizado para convertir el modelo User a JSON y viceversa

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()  # Hacemos una copia de los datos para poder modificarlos
        image_file = request.FILES.get('image')
        
        # Si hay un archivo de imagen, lo subimos a Imgur
        if image_file:
            imgur_url = self.upload_to_imgur(image_file)
            if imgur_url:
                data['image_url'] = imgur_url
            else:
                return Response({"error": "Error uploading image to Imgur"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Asignamos el usuario autenticado al campo id_user
        data['id_user'] = request.user.id
        
        # Serializamos y validamos los datos
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        # Guardamos el objeto con los datos
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def upload_to_imgur(self, image_file):
        imgur_client_id = 'cc5933407f174ac'
        headers = {
            "Authorization": f"Client-ID {imgur_client_id}"
        }
        files = {
            'image': image_file.read()
        }
        response = requests.post('https://api.imgur.com/3/image', headers=headers, files=files)

        if response.status_code == 200:
            return response.json()['data']['link']
        else:
            return None



class userViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all() 
    serializer_class = UserSerializer 
    def create(self, request, *args, **kwargs):
        data = request.data
        image_file = request.FILES.get('image')
        if image_file:
            imgur_url = self.upload_to_imgur(image_file)
            if imgur_url:
                data['image_url'] = imgur_url
            else:
                return Response({"error": "Error uploading image to Imgur"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# esta viewset gestiona las publicaciones en la application

        
    

class PostResponseViewSet(viewsets.ModelViewSet):
    queryset = PostReplies.objects.all()  
    serializer_class = PostResponseSerializer
    def create(self, request, *args, **kwargs):
        data = request.data
        post_id = data.get('post_id')
        try:
            post = Post.objects.get(post_id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    