from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from twilio.rest import Client
from psychologist.serializers import PsychologistSerializer
from psychologist.models import PSYCHOLOGIST



# Create your views here.
client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

class PsychologistConversatoinView(APIView):
    def get(self, id_user,request):
        # Filtra psicólogos que están asignados a la línea de ayuda y están disponibles
        psychologist = PSYCHOLOGIST.objects.filter(assigned_to_hotline=True, disponibilidad=True).first()

        if psychologist:
            serializer = PsychologistSerializer(psychologist)

#Crear una conversación en Twilio
            conversation = client.conversations.conversations.create(
                friendly_name=f"Conversación con {psychologist.nombre}"
            )

#Usar user_id como identificador único del usuario y del psicólogo
            user_identity = request.id_user # Obtén el ID del usuario autenticado
            psychologist_identity = psychologist.id_pshychologist  # Asume que user_id es el ID del psicólogo

#Agregar al psicólogo y al usuario a la conversación
            client.conversations.conversations(conversation.sid).participants.create(identity=str(user_identity))
            client.conversations.conversations(conversation.sid).participants.create(identity=str(psychologist_identity))

            return Response({
                "psychologist": serializer.data,
                "conversation_sid": conversation.sid
            })

        return Response({"error": "No hay psicólogos disponibles en la línea de ayuda"}, status=status.HTTP_404_NOT_FOUND)