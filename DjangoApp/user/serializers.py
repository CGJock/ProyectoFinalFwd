
from rest_framework import serializers
from user.models import USERS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from post.models import Post


#Base user form registro
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=USERS
        fields=["id_user", 'id_rol','password','dni_number',"sex","username","birth_date","name","first_name","last_name","email","phone_number","is_active"]
        birth_date = serializers.DateField(format='%m/%d/%Y', input_formats=['%m/%d/%Y'])
        extra_kwargs = {
            'password' : { 'required': False},
            'is_active' : {'required': False}
        }
    def create(self, validated_data):
        
        # No incluimos 'password' aquí porque se gestiona en la vista
        user = USERS(**validated_data)
        user.save()
        return user
        
  
        
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = USERS
        fields = [ 'email','password']
        
class DeleteUserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  USERS
        fields = ['id_user']
        

class ResetPasswordSerializer(serializers.Serializer):
    class Meta:
        model = USERS
        fields = ['new_password']
        
        def validate(self, attrs):
            return attrs 
        
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': str(attrs.get('password'))
        }

        #se encuentra al usuario
        user_obj = USERS.objects.filter(email=attrs.get("username")).first() or USERS.objects.filter(username=attrs.get("username")).first()
        if user_obj:
            credentials['username'] = user_obj.username

        data = super().validate(credentials)
        
        refresh = self.get_token(self.user)
        
        #se setean los datos en el payload del token
       
        refresh['email'] = self.user.email
        refresh['id_user'] = self.user.id_user


        #estos son los datos que iran en la respuesta
        data['email'] = self.user.email
        # data
        data['id_user'] = self.user.id_user
       
        return data
    
#serializer para traer los post del usuario
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['post_id', 'title', 'description', 'image_url', 'creation_date']
#serializer para traer los post de los usuarios amigos 
class UserFriendPostsSerializer(serializers.ModelSerializer):
    friends_posts = serializers.SerializerMethodField()

    class Meta:
        model = USERS
        fields = ['id_user', 'username', 'friends_posts']

    def get_friends_posts(self, obj):
        # Obtenemos todos los amigos de este usuario
        friends = obj.friends.all()
        
        # Filtramos los posts de los amigos usando sus `id_user`
        posts = Post.objects.filter(id_user__in=[friend.friend.id_user for friend in friends])
        
        # Serializamos los posts encontrados
        return PostSerializer(posts, many=True).data