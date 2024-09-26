from rest_framework.serializers import ModelSerializer
from .models import USERS
from .models import PSYCHOLOGIST
from .models import STUDENT

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
class PSYCHOLOGISTSerializer(ModelSerializer):
    class Meta:
        model=PSYCHOLOGIST
        fields='__all__'