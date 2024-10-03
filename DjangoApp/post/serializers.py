from rest_framework import serializers
from .models import Post,PostResponse



        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostResponse 
        fields = '__all__'