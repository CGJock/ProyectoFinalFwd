from rest_framework import serializers
from psychologist.models import PSYCHOLOGIST

#form registro psychologist
class PsychologistSerializer(serializers.ModelSerializer):
    class Meta:
        model=PSYCHOLOGIST
        fields=['license_code','availability','years_experience']

