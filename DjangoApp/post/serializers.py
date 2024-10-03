from rest_framework import serializers
from .models import Post,PostResponse
from user.models import USERS





class PostResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostResponse 
        fields = '__all__'
        
class PostSerializer(serializers.ModelSerializer):
    responses = PostResponseSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'description', 'image_url', 'comment_count','responses']
        read_only_fields = ['creation_date', 'modification_date', 'comment_count']
        

