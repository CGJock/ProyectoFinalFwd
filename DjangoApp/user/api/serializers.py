from rest_framework.serializers import ModelSerializer, Serializer
from user.models import USERS
from user.models import PSYCHOLOGIST
from user.models import STUDENT

#Base user form registro
class UserSerializer(ModelSerializer):
    class Meta:
        model=USERS
        fields='__all__'
 
 #form de registro estudiante   
class StudentSerializer(ModelSerializer):
    class Meta:
        model=STUDENT
        fields='__all__'
    
#form registro psychologist
class PsychologistSerializer(ModelSerializer):
    class Meta:
        model=PSYCHOLOGIST
        fields='__all__'

    