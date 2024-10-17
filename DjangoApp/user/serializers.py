
from rest_framework import serializers
from user.models import USERS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


#Base user form registro
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=USERS
        fields=["id_user", 'id_rol','dni_number',"sex","username","birth_date","name","first_name","last_name","email","phone_number"]
        birth_date = serializers.DateField(format='%m/%d/%Y', input_formats=['%m/%d/%Y'])
        extra_kwargs = {
            'password' : { 'required': False}
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
            'password': attrs.get("password")
        }

        # This is answering the original question, but do whatever you need here. 
        # For example in my case I had to check a different model that stores more user info
        # But in the end, you should obtain the username to continue.
        user_obj = USERS.objects.filter(email=attrs.get("username")).first() or USERS.objects.filter(username=attrs.get("username")).first()
        if user_obj:
            credentials['username'] = user_obj.username
            
        data = super().validate(credentials)
        # Adding custom claims to the token payload
        refresh = self.get_token(self.user)
        # Add extra fields to token payload
        refresh['email'] = self.user.email
        # Assuming the role is stored in a `role` field on the User model or related model
        # You need to adapt this based on your actual implementation (e.g., using a Profile model, or User attribute)
        refresh['rol_id'] = getattr(self.user.rol_id, 'id', None) 
        # Add the same info to the response data if you want to return it in the response body
        data['email'] = self.user.email
        data['rol_id'] = getattr(self.user.rol_id, 'id', None) 
        return data
       