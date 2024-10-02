from student.models import STUDENT
from rest_framework import serializers
from user.serializers import UserSerializer

 #form de registro estudiante   
class StudentSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    
    class Meta:
        model=STUDENT
        fields=['id_user','id_student','id_grade','id_institution','government_subsidy','scholarship']
        id_user = UserSerializer()  # Relación anidada con USERS

   
    