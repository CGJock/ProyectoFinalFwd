from .models import PSYCHOLOGIST,PACIENTFILES,EXPEDIENT,SESSION
from rest_framework import viewsets
from .serializers import PsychologistSerializer,PacientFilesSerializer,ExpedientSerializer,SessionSerializer,ExpedientSimpleSerializer,SessionExpedientSerializer
from rest_framework.response import Response
from datetime import timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
from rest_framework import status
from rest_framework import viewsets
from student.models import STUDENT
from psychologist.serializers import TicketSerializer
from user.serializers import  UserSerializer
from django.db.models import Count
from django.views.decorators.http import require_http_methods
from user.models import USERS
from .models import TICKET
from django.shortcuts import redirect
from django.conf import settings
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import action
from django.urls import reverse_lazy
# add the imports to the top
from django.views.generic.edit import CreateView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny  
from twilio.rest import Client
from django.conf import settings
import os
from dotenv import load_dotenv
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny 
from datetime import datetime, timedelta
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.errors import HttpError
from datetime import timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
from rest_framework.response import Response
from rest_framework import status
import time
import requests
from datetime import timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from rest_framework.response import Response
from rest_framework import status
import uuid  # Para generar un requestId único
from django.http import JsonResponse
from datetime import timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
import urllib.parse
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.response import Response
from google.oauth2 import service_account
from googleapiclient.discovery import build
from .models import SESSION
from .serializers import SessionExpedientSerializer





from pathlib import Path
# Cargar variables de entorno desde el archivo .env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv()



# Create your views here.
class RegisterPsychologistViewSet(viewsets.ModelViewSet):
    queryset = PSYCHOLOGIST.objects.all()
    serializer_class = PsychologistSerializer
    
    def create(self, request, *args, **kwargs):
        psychologist_serializer  = PsychologistSerializer(data=request.data)
        if psychologist_serializer.is_valid():
            psychologist_serializer.save()
            return Response(psychologist_serializer.data, status=status.HTTP_201_CREATED)
        elif psychologist_serializer.errors:
            return  Response(psychologist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        




ZOOM_REDIRECT_URI = os.getenv('ZOOM_REDIRECT_URI')
ZOOM_CLIENT_SECRET = os.getenv('ZOOM_CLIENT_SECRET')
ZOOM_CLIENT_ID = os.getenv('ZOOM_CLIENT_ID')
# def zoom_callback(request):
#     code = request.GET.get('code')
#     token_url = "https://zoom.us/oauth/token"
    
#     data = {
#         "grant_type": "authorization_code",
#         "code": code,
#         "redirect_uri": ZOOM_REDIRECT_URI,
#     }

#     # Solicitar el token de acceso
#     response = requests.post(token_url, auth=(ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET), data=data)
    
#     if response.status_code == 200:
#         tokens = response.json()
#         request.session['access_token'] = tokens['access_token']  # Guardar el token correctamente
        
#         return redirect('/')  # Redirige a la página de inicio o a una página de confirmación
#     else:
#         error_info = response.json()  # Capturar el error
#         print("Error al autenticar con Zoom:", error_info)
#         return JsonResponse({'error': 'Failed to authenticate with Zoom'}, status=400)

# def create_zoom_meeting(session_date, access_token):
#     url = "https://api.zoom.us/v2/users/me/meetings"
#     headers = {
#         "Authorization": f"Bearer {access_token}",
#         "Content-Type": "application/json"
#     }
    
#     start_time_str = session_date.isoformat() + 'Z'
#     meeting_details = {
#         "topic": "Reunión de Prueba",
#         "type": 2,
#         "start_time": start_time_str,
#         "duration": 30,
#         "timezone": "America/New_York",
#         "settings": {
#             "host_video": True,
#             "participant_video": True,
#             "join_before_host": True,
#             "mute_upon_entry": False
#         }
#     }

#     response = requests.post(url, headers=headers, json=meeting_details)

#     if response.status_code == 201:
#         return response.json()
#     else:
#         try:
#             error_info = response.json()
#             return {"error": error_info}
#         except ValueError:
#             return {"error": response.text}

from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import SESSION, EXPEDIENT  # Asegúrate de que esto coincida con tus modelos
from .serializers import SessionExpedientSerializer  # Asegúrate de que esto coincida con tu serializador
from datetime import datetime

class RegisterSession(viewsets.ModelViewSet):
    queryset = SESSION.objects.all()
    serializer_class = SessionExpedientSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        session_date_str = request.data.get('session_date')
        id_expedient = request.data.get('id_expedient')

        if not session_date_str:
            return Response({'error': 'session_date is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session_date = datetime.fromisoformat(session_date_str)
        except ValueError:
            return Response({'error': 'Invalid date format. Expected ISO format.'}, status=status.HTTP_400_BAD_REQUEST)

        # Obtiene la instancia del expediente
        expedient = get_object_or_404(EXPEDIENT, id_expedient=id_expedient)  # Asegúrate de usar el campo correcto

        # Guarda la sesión en la base de datos
        session = SESSION(
            session_date=session_date,
            id_expedient=expedient  # Asigna la instancia del expediente aquí
            # Añade otros campos que necesites aquí
        )
        session.save()

        # Responde con un mensaje de éxito
        return Response({'message': 'Sesión creada exitosamente', 'session_id': session.id_session}, status=status.HTTP_201_CREATED)


    
    
    
from django.shortcuts import redirect
from django.conf import settings
import requests

def google_callback(request):
    code = request.GET.get('code')

    if not code:
        return JsonResponse({'error': 'Authorization code not provided'}, status=400)

    # Intercambia el código por un access_token
    token_response = requests.post(
        'https://oauth2.googleapis.com/token',
        data={
            'code': code,
            'client_id': settings.GOOGLE_CLIENT_ID,
            'client_secret': settings.GOOGLE_CLIENT_SECRET,
            'redirect_uri': settings.GOOGLE_REDIRECT_URI,
            'grant_type': 'authorization_code',
        },
    )

    if token_response.status_code != 200:
        return JsonResponse({'error': 'Failed to retrieve access token'}, status=token_response.status_code)

    token_data = token_response.json()
    access_token = token_data.get('access_token')

    # Guarda el token en la sesión
    request.session['access_token'] = access_token

    # Redirige al frontend para completar la creación de la sesión
    return redirect('http://localhost:5173/profile/psychologist/create-session/')  # Ajusta la URL según tu frontend



        


    

class CreateTicket(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = TICKET.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        id_user = request.data.get('id_user')
        access_token = request.data.get('access_token')
        refresh_token = request.data.get('refresh_token')
        try:
            user = USERS.objects.get(id_user=id_user)
        except USERS.DoesNotExist:
            return Response({"error": "usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        ticket_data = {
            "id_user": user.id_user,
            "access_token" : access_token,
            "refresht_token" : refresh_token,

            }
        ticket_serializer = self.get_serializer(data=ticket_data)
        
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return Response(ticket_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateTicket(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = TICKET.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]
        
    def partial_update(self, request, *args, **kwargs):
        id_ticket = kwargs.get('id_ticket')#se obtiene el id desde la ruta
        # Busca el ticket que se desea actualizar
        try:
            ticket = TICKET.objects.get(id_ticket=id_ticket) # Obtiene el ticket por pk o cualquier identificador
        except TICKET.DoesNotExist:
            return Response({"error": "Ticket no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        # Actualiza parcialmente el ticket con los datos enviados
        ticket_data = {
    
            'state': request.data.get('state'),

            }
        ticket_serializer = self.get_serializer(ticket, data=ticket_data, partial=True)
        
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return Response(ticket_serializer.data, status=status.HTTP_200_OK)
        elif ticket_serializer.errors:
            return Response(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

        

class TicketList(viewsets.ReadOnlyModelViewSet):
    queryset = TICKET.objects.all()
    serializer_class = TicketSerializer
    authentication_classes = []
    permission_classes = [AllowAny]
    
from rest_framework.parsers import MultiPartParser   
class FileUploadView(APIView):
    parser_class = (MultiPartParser,)
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, id_expedient, format=None):
        
        
        expedient = EXPEDIENT.objects.get(id_expedient=id_expedient)
        
        files = request.FILES.getlist('files')
        for file_archive in request.FILES.getlist('files'):
            data = {
            'id_expedient' : expedient.id_expedient,
            'file_name'  : file_archive.name,
            'file' : file_archive
            }
            
        serializer = ExpedientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            
        else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
                    
    # queryset = PACIENTFILES.objects.all()
    # serializer_class = PacientFilesSerializer
    # authentication_classes = []
    # permission_classes = [AllowAny]
    # model = PACIENTFILES
    # fields = ['file' ]
    # success_url = reverse_lazy('PACIENTFILES')
    
    # def get_context_data(self,request, **kwargs):
    #     fields = request.data.get('file')
    #     fields['documents'] = PACIENTFILES.objects.all()
    #     return fields
        




class CreateCase(viewsets.ModelViewSet):
    queryset = EXPEDIENT.objects.all()
    serializer_class = ExpedientSimpleSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        id_user = request.data.get('id_user')

        # Check if patient exists
        try:
            pacient = USERS.objects.get(id_user=id_user)
        except USERS.DoesNotExist:
            return Response({'error': 'No existe un paciente con ese id'}, status=status.HTTP_404_NOT_FOUND)

        # busca un psicologo desponible con un pacient_count menor a 4
        psychologist = PSYCHOLOGIST.objects.filter(pacient_count__lt=4).order_by('pacient_count').first()
        if not psychologist:
            return Response({'error': 'No hay psicólogos disponibles'}, status=status.HTTP_404_NOT_FOUND)

        # Create expedient data
        expedient_data = {
            'id_pacient': pacient.id_user,
            'id_psychologist': psychologist.id_psychologist
        }
        expedient_serializer = self.get_serializer(data=expedient_data)

        if expedient_serializer.is_valid():
            # Save expedient and update psychologist count
            expedient_serializer.save()
            psychologist.pacient_count += 1
            psychologist.save()

            return Response(expedient_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(expedient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class CasesList(viewsets.ReadOnlyModelViewSet):
    queryset = EXPEDIENT.objects.all()
    serializer_class = ExpedientSerializer
    authentication_classes = []
    permission_classes = [AllowAny]   
        
    
#listado de todos los casos asignados a un psicologo    
class PsychologistCases(APIView):
    permission_classes = []
    permission_classes = [AllowAny]
    def get(self,request,id_psychologist):
        try:
            #se hace la busqueda del psicolgo
            psychologist = PSYCHOLOGIST.objects.get(id_psychologist=id_psychologist)
            
            expedients = EXPEDIENT.objects.filter(id_psychologist=psychologist)
            
            if not expedients.exists():
                return Response({'error':'No hay expedientes para este psicologo'},status=status.HTTP_404_NOT_FOUND)
            
            serializer = ExpedientSerializer(expedients, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
            
            
        except PSYCHOLOGIST.DoesNotExist:
            return Response({'error': 'No se encontró el psicólogo'}, status=status.HTTP_404_NOT_FOUND)
        
class PychologistsList(viewsets.ReadOnlyModelViewSet):
    queryset = PSYCHOLOGIST.objects.all()
    serializer_class = PsychologistSerializer
    
        

#vista para obtener un expediente especifico
class  ExpedientDetail(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def retrieve(self,request,id_expedient):
        try:
            expedient = EXPEDIENT.objects.get(id_expedient=id_expedient)
            serializer =  ExpedientSerializer(expedient)
            return Response(serializer.data, status=200)
        
        except  EXPEDIENT.DoesNotExist:
            return Response({'error':'No hay expedientes con ese ID'},status=404)  
    
        
#vista que unifica psicologo y user
class PsychologistUser(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]   
        
    def list(self, request, ):
        # Recupera todos los psicologos con sus usuarios relacionados
        psychologists = PSYCHOLOGIST.objects.select_related('id_user').all()
        serializer = PsychologistSerializer(psychologists, many=True)
        return Response(serializer.data)
    
class  PsychologistUserDetail(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def retrieve(self,request,id_user):
        try:
            psychologist = PSYCHOLOGIST.objects.select_related('id_user').get(id_user=id_user)

            serializer =  PsychologistSerializer(psychologist)
        
        except  PSYCHOLOGIST.DoesNotExist:
            return Response({'error':'No se encontró el psicologo'},status=404)

        return  Response(serializer.data, status=200)



    
class TicketList(viewsets.ReadOnlyModelViewSet):
    queryset = TICKET.objects.all()
    serializer_class = TicketSerializer
    authentication_classes = []
    permission_classes = [AllowAny]   
        
    
    
    
    
    


        
   
   
    



    

    



