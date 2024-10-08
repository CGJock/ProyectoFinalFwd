from rest_framework import serializers
from .models import Post, PostReplies
from user.models import USERS

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USERS
        fields = ['id_user', 'email', 'first_name', 'last_name']

class PostSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only=True) 
    class Meta:
        model = Post
        fields = ['id_user', 'title', 'description', 'image_url', 'comment_count','replies']
        read_only_fields = ['creation_date', 'modification_date', 'comment_count']
        

class PostResponseSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only=True)
    class Meta:
        model = PostReplies
        fields = '__all__'