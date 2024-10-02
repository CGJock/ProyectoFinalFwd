
from rest_framework import serializers
from user.models import USERS

#Base user form registro
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=USERS
        fields=['id_rol','dni_number',"sex","username","birth_date","name","first_name","last_name","email","password","phone_number"]
      
        birth_date = serializers.DateField(format='%m/%d/%Y', input_formats=['%m/%d/%Y'])
        extra_kwargs = {
            'password' : { 'write_only': True}
        }

        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            #.set_password es un metodo de django es el que nos permite hacer el hash
            instance.set_password(password)
        instance.save()
        return instance
        
        
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = USERS
        fields = ['username', 'email','password']
          

        
