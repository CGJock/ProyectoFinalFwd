from rest_framework import serializers
from .models import Post, PostReplies
from user.models import USERS

# Serializador para el modelo USERS
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USERS # Especifica el modelo que se está serializando
        fields = ['id_user', 'email', 'first_name', 'last_name']  # Campos que se incluirán en la representación del serializador

# Serializador para el modelo Post
class PostSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only=True)  # Incluye el serializador de usuario, que será de solo lectura
    class Meta:
        model = Post  # Especifica el modelo que se está serializando
        fields = ['id_user', 'title', 'description', 'image_url', 'comment_count','replies']  # Campos que se incluirán en la representación del serializador
        read_only_fields = ['creation_date', 'modification_date', 'comment_count'] # Campos que no se pueden modificar
        
# Serializador para el modelo PostReplies
class PostResponseSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only=True) # Incluye el serializador de usuario, que será de solo lectura
    class Meta:
        model = PostReplies # Especifica el modelo que se está serializando
        fields = '__all__' # Incluye todos los campos del modelo en la representación del serializador