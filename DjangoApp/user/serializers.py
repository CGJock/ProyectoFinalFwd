from rest_framework import serializers
from user.models import USERS
#Base user form registro
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=USERS
        birth_date = serializers.DateField(format='%m/%d/%Y', input_formats=['%m/%d/%Y'])
        fields='__all__'
        password 
    

        
