from rest_framework import serializers
from psychologist.models import PSYCHOLOGIST,TICKET,PACIENTFILES,EXPEDIENT
from user.models import USERS
from user.serializers import UserSerializer

#form registro psychologist
class PsychologistSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    class Meta:
        model=PSYCHOLOGIST
        fields=['id_user','id_psychologist','pacient_count','availability','license_code','years_experience']
        
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
        
        

 