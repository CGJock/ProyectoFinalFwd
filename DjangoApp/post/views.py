from rest_framework import viewsets,  status
from .models import Post, User, PostResponse
from .serializers import PostSerializer, UserSerializer, PostResponseSerializer
from rest_framework.response import Response
import requests
# queryset = Consulta de todos los usuarios en la base de datos.
# serializer_class= Clase del serializador utilizado para convertir el modelo User a JSON y viceversa
class userViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all() 
    serializer_class = UserSerializer 
#esta viewset gestiona las publicaciones en la application
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    #args es la solicitud que va a contener los datos de la nueva publibacion
    def create(self, request, *args, **kwargs):
        data = request.data
        image_file = request.FILES.get('image')  
    
        #upload_to_imgur(image_file): Subida de archivos de imagen al servicio de Imgur.
        if image_file:
            imgur_url = self.upload_to_imgur(image_file)
            if imgur_url:
                
                data['image_url'] = imgur_url
            else:
                #response devuelve ya sea un error de la solicitud o el estado de la misma 
                return Response({"error": "Error uploading image to Imgur"}, status=status.HTTP_400_BAD_REQUEST)

        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
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

class PostResponseViewSet(viewsets.ModelViewSet):
    queryset = PostResponse.objects.all()  
    serializer_class = PostResponseSerializer