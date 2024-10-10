
from rest_framework import serializers
from user.models import USERS


#Base user form registro
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=USERS
        fields=["id_user", 'id_rol','dni_number',"sex","username","birth_date","name","first_name","last_name","email","phone_number"]
        print(fields[0])
        #fields=["id_user"]
      
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
        

          

        
