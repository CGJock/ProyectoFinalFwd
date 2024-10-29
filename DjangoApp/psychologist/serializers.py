from rest_framework import serializers
from psychologist.models import PSYCHOLOGIST,TICKET,PACIENTFILES,EXPEDIENT,OBSERVATIONS,SESSION
from user.models import USERS
from user.serializers import UserSerializer

#form registro psychologist
class PsychologistSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    class Meta:
        model=PSYCHOLOGIST
        fields=['id_user','id_psychologist','pacient_count','availability','license_code','years_experience','assigned_to_hotline']
        
class TicketSerializer(serializers.ModelSerializer):
    id_user = serializers.PrimaryKeyRelatedField(queryset=USERS.objects.all())
    class Meta:
        model=TICKET
        fields=['id_ticket','id_user','state']
        
        
class PacientFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model=PACIENTFILES
        fields = "__all__"
        

class ObervationsSerializer(serializers.ModelSerializer):
    class Meta:
        model=OBSERVATIONS
        fields = '__all__'
        
class  SessionSerializer(serializers.ModelSerializer):
    observations = ObervationsSerializer()#se anidan las observaciones de las sesiones
    class Meta:
        model=SESSION
        fields = '__all__'

class ExpedientSerializer(serializers.ModelSerializer):
    Sessions = SessionSerializer(many=True)
    class Meta:
        model=EXPEDIENT
        fields = ['id_expedient','id_pacient','id_psychologist','state','created_at','Sessions']
        
        
    


        
        
        

 