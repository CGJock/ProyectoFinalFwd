from rest_framework import serializers
from psychologist.models import PSYCHOLOGIST,TICKET
from user.models import USERS

#form registro psychologist
class PsychologistSerializer(serializers.ModelSerializer):
    class Meta:
        model=PSYCHOLOGIST
        fields=['license_code','availability','years_experience']
        
class TicketSerializer(serializers.ModelSerializer):
    id_user = serializers.PrimaryKeyRelatedField(queryset=USERS.objects.all())
    class Meta:
        model=TICKET
        fields=['id_user']
        
        
        
        

 