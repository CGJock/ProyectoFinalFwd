from rest_framework import serializers
from psychologist.models import PSYCHOLOGIST,TICKET,PACIENTFILES,EXPEDIENT
from user.models import USERS

#form registro psychologist
class PsychologistSerializer(serializers.ModelSerializer):
    class Meta:
        model=PSYCHOLOGIST
        fields='__all__'
        
class TicketSerializer(serializers.ModelSerializer):
    id_user = serializers.PrimaryKeyRelatedField(queryset=USERS.objects.all())
    class Meta:
        model=TICKET
        fields=['id_ticket','id_user','state']
        
        
class PacientFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model=PACIENTFILES
        fields = "__all__"
        
class ExpedientSerializer(serializers.ModelSerializer):
    class Meta:
        model=EXPEDIENT
        fields = '__all__'
        
        

 