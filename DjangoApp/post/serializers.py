from rest_framework import serializers
from .models import Post, User, PostResponse

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class PostResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostResponse 
        fields = '__all__'
        
class PostSerializer(serializers.ModelSerializer):
    responses = PostResponseSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'description', 'image_url', 'comment_count']
        read_only_fields = ['creation_date', 'modification_date', 'comment_count']
        

