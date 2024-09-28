from rest_framework.serializers import ModelSerializer
from user.models import USERS, PSYCHOLOGIST, STUDENT

#Base user form registro
class UserSerializer(ModelSerializer):
    class Meta:
        model=USERS
        fields=['dni_number','state','id_rol','username','birth_date','first_name','last_name','email','password','phone_number']
 
 #form de registro estudiante   
class StudentSerializer(ModelSerializer):
    class Meta:
        model=STUDENT
        fields='__all__'
    
#form registro psychologist
class PsychologistSerializer(ModelSerializer):
    class Meta:
        model=PSYCHOLOGIST
        fields=['license_code','availability','years_experience']


        
