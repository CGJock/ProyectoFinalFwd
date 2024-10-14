from .models import PSYCHOLOGIST
from rest_framework import viewsets
from .serializers import PsychologistSerializer
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
        




class CreateCase(viewsets.ViewSet):
    @action(detail=True, methods=['POST'])
    def Assign_case(request):
        
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed("no autentificado")
        try:
            payload = jwt.decode(token, 'secret', algorithm='HS256')
            
        except jwt.ExpiredSignatureError :
                raise AuthenticationFailed("no autentificado")
            
        user =  USERS.objects.filter(id_user=payload['id_user']).first()
        
        if user:
            
            try:
                #encuentra un studiante, sin caso
                pacient = user
                if not pacient:
                    return  Response({'error':'No existe un paciente con ese id'},status=status.HTTP_404_NOT_FOUND)
        
                psychologist = PSYCHOLOGIST.objects.select_related('id_user','id_user').annotate(pacient_count=Count('pacient')).filter(pacient_count__lt=4).first()
        
                if not psychologist:
                    return  Response({'error':'No hay psicologos disponibles'},status=status.HTTP_404_NOT_FOUND)
        
            
                pacient.psychologist =  psychologist
                pacient.save()
            
                return Response({f'psicologo: {psychologist} asignado a {pacient} '})
        
            except Exception as e:
                
                return Response({'error': str(e)}, status=500)
        

        return  Response({'error': 'No existe un paciente con ese id'}, status=404)

    
    
    
    
    


        
   
   
    



    

    



