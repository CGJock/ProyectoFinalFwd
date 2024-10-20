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
    authentication_classes = []
    permission_classes = [AllowAny]
    
    
    def Assign_case(self,request,*args, **kwargs):
        
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed("no autentificado")
        try:
            payload = jwt.decode(token, 'secret', algorithm='HS256')
            
        except jwt.ExpiredSignatureError :
                raise AuthenticationFailed("no autentificado")
            
        admin =  USERS.objects.filter(id_user=payload['id_user']).first()
        
            
        pacient_id = request.data.get('user_id')
        
        if admin:
            
            try:
                #encuentra un studiante, sin caso
                pacient = USERS.objects.find(id_user=pacient_id)
                if not pacient:
                    return  Response({'error':'No existe un paciente con ese id'},status=status.HTTP_404_NOT_FOUND)
        
                psychologist = PSYCHOLOGIST.objects.filter(pacient_count__lt=4).order_by()
        
                if not psychologist:
                    return  Response({'error':'No hay psicologos disponibles'},status=status.HTTP_404_NOT_FOUND)
        
            
                pacient.psychologist =  psychologist
                pacient.save()
            
                return Response({f'psicologo: {psychologist} asignado a {pacient} '})
        
            except Exception as e:
                
                return Response({'error': str(e)}, status=500)
        

        return  Response({'error': 'No existe un paciente con ese id'}, status=404)

    
    
    
    
    


        
   
   
    



    

    



