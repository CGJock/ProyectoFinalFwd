from rest_framework import serializers
from .models import USERS
from .models import PSYCHOLOGIST
from .models import STUDENT

#Base user form registro
class BasicSerializer(serializers.ModelSerializer):
    class Meta:
        model=USERS
        fields='__all__'
 
 #form de registro estudiante   
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=STUDENT
        fields='__all__'
    
#form registro psychologist
class PSYCHOLOGISTSerializer(serializers.ModelSerializer):
    class Meta:
        model=PSYCHOLOGIST
        fields='__all__'