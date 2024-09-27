from rest_framework.serializers import ModelSerializer, Serializer
from grade.models import GRADE

class GradeSerializer(ModelSerializer):
    class Meta:
        model=GRADE
        fields='__all__'