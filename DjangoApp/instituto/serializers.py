from rest_framework.serializers import ModelSerializer
from instituto.models import INSTITUTIONS

class InstitutoSerializer(ModelSerializer):
    class Meta:
        model=INSTITUTIONS
        fields='__all__'