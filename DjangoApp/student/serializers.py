from models import STUDENT
from rest_framework import serializers

 #form de registro estudiante   
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=STUDENT
        fields='__all__'
    