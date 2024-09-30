from student.models import STUDENT
from rest_framework import serializers

 #form de registro estudiante   
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=STUDENT
        fields=['id_student','id_grade','id_institution','government_subsidy','scholarship']
    