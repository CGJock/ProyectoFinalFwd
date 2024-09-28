from rest_framework.serializers import ModelSerializer
from grade.models import GRADE

class GradeSerializer(ModelSerializer):
    class Meta:
        model=GRADE
        fields='__all__'