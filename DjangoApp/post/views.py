from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from post.models import Post, PostReplies
from user.models import USERS
from .serializers import PostSerializer, PostResponseSerializer
from user.serializers import UserSerializer
from rest_framework.response import Response
import requests
from rest_framework_simplejwt.authentication import JWTAuthentication


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication] 
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        response = requests.post(
            "https://47s694y3dg.execute-api.us-east-2.amazonaws.com/default/getDatafromAWS",
            json={"method":data["method"],"files_info":data["files_info"]},
                )
         
        image_file = request.FILES.get('image')
        if image_file:
            imgur_url = self.upload_to_imgur(image_file)
            if imgur_url:
                data['image_url'] = imgur_url
            else:
                return Response({"error": "Error uploading image to Imgur"}, status=status.HTTP_400_BAD_REQUEST)

        # data['id_user'] = request.user.id_user // se documenta esta linea porque id_user no se pasan por la carga de datos, se tiene que configurar de otra manera

        serializer = self.get_serializer(data=data["table_data"])
        serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)// en ves de usar esta linea, usamos la de bajo.
        serializer.save(id_user=request.user)# usamos esta linea para setear automaticamente id_user

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def upload_to_imgur(self, image_file):
        headers = {
            "Authorization": 'cc5933407f174ac',
        }
        data = {
            'image': image_file.read(),
        }
        response = requests.post("https://api.imgur.com/3/upload", headers=headers, files={'image': image_file})
        
        if response.status_code != 200:
            print(f"Error uploading to Imgur: {response.status_code}")
            return None
        
        imgur_data = response.json()
        return imgur_data['data']['link']

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
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

class PostResponseViewSet(viewsets.ModelViewSet):
    serializer_class = PostResponseSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        if post_id:
            return PostReplies.objects.filter(post_id=post_id)
        return PostReplies.objects.all()

    def create(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        try:
            post = Post.objects.get(post_id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['post_id'] = post_id
        data['id_user'] = request.user.id_user

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)