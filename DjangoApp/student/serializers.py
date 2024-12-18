from student.models import STUDENT
from rest_framework import serializers
from user.serializers import UserSerializer
from instituto.serializers import  InstitutoSerializer
from grade.serializers import GradeSerializer


 #form de registro estudiante   
class StudentSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    id_institution = InstitutoSerializer() #nested serializers
    id_grade = GradeSerializer()
    
    class Meta:
        model=STUDENT
        fields=['id_user','id_student','id_grade','id_institution','government_subsidy','scholarship']
        
        

   
    