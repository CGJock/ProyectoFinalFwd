from rest_framework import serializers
from .models import Post, PostResponse
from user.models import USERS

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USERS
        fields = ['id_user', 'username', 'email', 'first_name', 'last_name']

class PostSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only=True) 
    class Meta:
        model = Post
        fields = ['id_user', 'username', 'title', 'description', 'image_url', 'comment_count','responses']
        read_only_fields = ['creation_date', 'modification_date', 'comment_count']
        

        
class PostResponseSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only=True)
    class Meta:
        model = PostResponse 
        fields = '__all__'
        

