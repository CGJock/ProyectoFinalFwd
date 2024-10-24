from .models import PSYCHOLOGIST,PACIENTFILES,EXPEDIENT
from rest_framework import viewsets
from .serializers import PsychologistSerializer,PacientFilesSerializer,ExpedientSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from student.models import STUDENT
from psychologist.serializers import TicketSerializer
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
    
    
class FileUploadView(viewsets.ModelViewSet):
    queryset = PACIENTFILES.objects.all()
    serializer_class = PacientFilesSerializer
    authentication_classes = []
    permission_classes = [AllowAny]
    model = PACIENTFILES
    fields = ['file' ]
    success_url = reverse_lazy('PACIENTFILES')
    
    def get_context_data(self,request, **kwargs):
        fields = request.data.get('file')
        fields['documents'] = PACIENTFILES.objects.all()
        return fields
        




class CreateCase(viewsets.ModelViewSet):
    queryset = EXPEDIENT.objects.all()
    serializer_class = ExpedientSerializer 
    # permission_classes = [IsAuthenticated]
    authentication_classes = []
    permission_classes = [AllowAny]
    
    
    def create(self,request,*args, **kwargs):
        
        id_user = request.data.get('id_user')
            
        try:
            #encuentra un studiante, sin caso
            pacient = USERS.objects.get(id_user=id_user)
        
        except USERS.DoesNotExist:
                    return  Response({'error':'No existe un paciente con ese id'},status=status.HTTP_404_NOT_FOUND)
        try:
            #encuentra al primer psicologo con menos de 4 casos para hacer una reparticion justa
            psychologist = PSYCHOLOGIST.objects.filter(pacient_count__lt=4).order_by('pacient_count').first()
        
            if not psychologist:
                raise PSYCHOLOGIST.DoesNotExist
        except PSYCHOLOGIST.DoesNotExist:
            return Response({'error': 'No hay psicólogos disponibles'}, status=status.HTTP_404_NOT_FOUND)
        
        expedient_data = {
            'id_pacient': pacient.id_user,
            'id_psychologist': psychologist.id_psychologist
        } 
        expedient_serializer = self.get_serializer(data=expedient_data)
        
        if expedient_serializer.is_valid():
            expedient_serializer.save()
                
            return Response(expedient_serializer.data,status=status.HTTP_201_CREATED)
        elif ticket_serializer.errors:
            return Response(expedient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#vista que unifica psicologo y user
class PsychologistUser(viewsets.ViewSet):
    def list(self, request, ):
        # Recupera todos los psicologos con sus usuarios relacionados
        psychologists = PSYCHOLOGIST.objects.select_related('id_user').all()
        serializer = PsychologistSerializer(psychologists, many=True)
        return Response(serializer.data)
    
        
    
    
    
    
    


        
   
   
    



    

    



