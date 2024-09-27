from rest_framework.serializers import ModelSerializer
from rol.models import ROL

class RolSerializer(ModelSerializer):
    class Meta:
        model=ROL
        fields='__all__'