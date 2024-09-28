from rest_framework.serializers import ModelSerializer
from instituto.models import INSTITUTIONS

class InstitutoSerializer(ModelSerializer):
    MODEL=INSTITUTIONS
    fields='__all__'