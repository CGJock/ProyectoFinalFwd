
from rest_framework import serializers
from user.models import USERS
from rol.serializers import RolSerializer

#Base user form registro
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=USERS
        fields=["id_user", 'id_rol','dni_number',"sex","username","birth_date","name","first_name","last_name","email","password","phone_number"]
        print(fields[0])
        #fields=["id_user"]
      
        birth_date = serializers.DateField(format='%m/%d/%Y', input_formats=['%m/%d/%Y'])
        extra_kwargs = {
            'password' : { 'write_only': True}
        }

        
  
        
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = USERS
        fields = [ 'email','password']
        
class DeleteUserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  USERS
        fields = ['id_user']

          

        
