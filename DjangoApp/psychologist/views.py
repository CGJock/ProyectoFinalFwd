from .models import PSYCHOLOGIST,PACIENTFILES,EXPEDIENT
from rest_framework import viewsets
from .serializers import PsychologistSerializer,PacientFilesSerializer,ExpedientSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from student.models import STUDENT
from psychologist.serializers import TicketSerializer
from user.serializers import  UserSerializer
from django.db.models import Count
from django.views.decorators.http import require_http_methods
from user.models import USERS
from .models import TICKET
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
        
class PychologistsList(viewsets.ReadOnlyModelViewSet):
    queryset = PSYCHOLOGIST.objects.all()
    serializer_class = PsychologistSerializer
    

    

class CreateTicket(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = TICKET.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def create(self,request,*args, **kwargs):
        #se obtiene el usuario del request
        id_user = request.data.get('id_user')
        try:
            user = USERS.objects.get(id_user=id_user)
        except USERS.DoesNotExist:
            return Response({"error":"usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        #se crea un diccionario para ser usado en el serializer
        ticket_data = {"id_user": user.id_user}
        ticket_serializer = self.get_serializer(data=ticket_data)
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return Response(ticket_serializer.data,status=status.HTTP_201_CREATED)
        elif ticket_serializer.errors:
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
    serializer_class = ExpedientSerializer
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
        
    
    
    
    
    


        
   
   
    



    

    



