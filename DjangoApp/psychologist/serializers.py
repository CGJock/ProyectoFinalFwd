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
        fields="__all__"
        
class PacientFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model=PACIENTFILES
        fields = "__all__"
        

class ObervationsSerializer(serializers.ModelSerializer):
    class Meta:
        model=OBSERVATIONS
        fields = '__all__'
        
class  SessionSerializer(serializers.ModelSerializer):
    # observations = ObervationsSerializer()#se anidan las observaciones de las sesiones
    class Meta:
        model=SESSION
        fields = '__all__'
        

class ExpedientSerializer(serializers.ModelSerializer):
    Sessions = SessionSerializer(many=True, required=False)
    id_pacient = UserSerializer()
    id_psychologist = PsychologistSerializer()
    
    class Meta:
        model=EXPEDIENT
        fields = ['id_expedient','id_pacient','id_psychologist','state','created_at','Sessions']
        
    def create(self, validated_data):
        sessions_data = validated_data.pop('Sessions', [])
        expedient = EXPEDIENT.objects.create(**validated_data)

        # Crear sesiones anidadas si están incluidas en los datos de validación
        for session_data in sessions_data:
            SESSION.objects.create(id_expedient=expedient, **session_data)

        return expedient
    
class SessionExpedientSerializer(serializers.ModelSerializer):
        id_expedient = serializers.PrimaryKeyRelatedField(queryset=EXPEDIENT.objects.all(), source='id_expedient')

        class Meta:
            model = SESSION
            fields = ['id_session','id_expedient','session_date']
            
        def create(self, validated_data):
            sessions_data = validated_data.pop('Sessions', [])
            expedient = EXPEDIENT.objects.create(**validated_data)

            # Crear sesiones anidadas si están incluidas en los datos de validación
            for session_data in sessions_data:
                SESSION.objects.create(id_expedient=expedient, **session_data)

            return expedient
                
        
    
class ExpedientSimpleSerializer(serializers.ModelSerializer):
    Observations =  SessionSerializer(many=True, required=False)
    class Meta:
        model = EXPEDIENT
        fields = ['id_expedient','id_pacient','id_psychologist','state','Observations']
        
    def create(self, validated_data):
        observations_data = validated_data.pop('Observations', [])
        observation = EXPEDIENT.objects.create(**validated_data)

        # Crear sesiones anidadas si están incluidas en los datos de validación
        for observation_data in observations_data:
            OBSERVATIONS.objects.create(id_observation=observation, **observation_data)

        return observation   

        
        
    


        
        
        

