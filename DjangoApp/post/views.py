from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, status
from post.models import Post, PostReplies,FRIENDS
from user.models import USERS
from .serializers import PostSerializer, PostResponseSerializer,ListFriendSerializer,FriendsToFollowSerializer,UserFriendsSerializer
from user.serializers import UserSerializer
from rest_framework.response import Response
import requests
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.views import APIView

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

class FriendsToFollow(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id_user=None):
        user = get_object_or_404(USERS, id_user=id_user)
       
        # Obtener los IDs de los amigos del usuario actual
        friends_ids = FRIENDS.objects.filter(Q(user=user)).values_list('friend', flat=True)
        friends_of_ids = FRIENDS.objects.filter(Q(friend=user)).values_list('user', flat=True)
        
        # se juntan los sets de los amigos 
        all_friends_ids = set(friends_ids).union(set(friends_of_ids))

        # Excluir a los amigos y al propio usuario
        users_to_follow = USERS.objects.exclude(id_user__in=all_friends_ids).exclude(id_user=id_user)

        # Serializar los usuarios
        user_serializer = UserFriendsSerializer(users_to_follow, many=True)
        
        return Response({"data": user_serializer.data}, status=status.HTTP_200_OK)
        
    
   #listado que muestra los usuarios perteneciantes a un usuario  
class FriendListViewSet(viewsets.ModelViewSet):
    serializer_class = ListFriendSerializer
    #se enviara el id del usuario en los parametros del request
    def list(self, request, id_user=None):
        # Recupera todos los amigos de un usuario en especifico
        user =  get_object_or_404(USERS, id_user=id_user)
        friends = FRIENDS.objects.filter(user=id_user)
        #serializa los amigos en el respectivo serializer 
        friend_list = ListFriendSerializer(friends, many=True)
        
        return Response({"data": friend_list.data}, status=status.HTTP_200_OK)
    
class AddFriendViewSet(viewsets.ModelViewSet):
    serializer_class = ListFriendSerializer
    
    def create(self,request,id_user,id_friend):
        id_user = request.data.get('id_user')
        id_friend = request.data.get('id_friend')
       
        
        # se verifica que ambos usuarios existan
        user = get_object_or_404(USERS, id_user=id_user)
        friend = get_object_or_404(USERS, id_user=id_friend)
        
        if FRIENDS.objects.filter(user=id_user, friend=id_friend).exists():
            return Response({"detail": "Ya son amigos"}, status=status.HTTP_400_BAD_REQUEST)
        
        
             
        #se crea la instancia en el modelo FRIENDS                      
        friend_request_data = {
            'user' : user.id_user,
            'friend' : friend.id_user #ahora que se verificaron la existencia de estas entidades se pueden instanciar directamente
        }
        
        friend_request_serializer = ListFriendSerializer(user, data=friend_request_data)
        
        if friend_request_serializer.is_valid(raise_exception=True):
            friend_request_serializer.save()
            return Response(friend_request_serializer.data, status=status.HTTP_200_OK)  # Devuelve los datos del usuario actualizado

        return Response(friend_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        
        
    
    