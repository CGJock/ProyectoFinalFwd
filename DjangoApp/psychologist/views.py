from .models import PSYCHOLOGIST
from rest_framework import viewsets
from .serializers import PsychologistSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from student.models import STUDENT
from django.db.models import Count
from django.views.decorators.http import require_http_methods
from user.models import USERS
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
    

class CreateCase(viewsets.ViewSet):
    @action(detail=True, methods=['post'])
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

    
    
    
    
    


        
   
   
    



    

    



