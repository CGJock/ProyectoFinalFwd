
from .models import INSTITUTIONS
from rest_framework import viewsets
from .serializers import InstitutoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny  


# Create your views here.

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = INSTITUTIONS.objects.all()
    serializer_class = InstitutoSerializer
    authentication_classes = [IsAuthenticated]
   
    
class InstitutionsList(viewsets.ReadOnlyModelViewSet):
    queryset = INSTITUTIONS.objects.all()
    serializer_class = InstitutoSerializer
    authentication_classes = [IsAuthenticated]
    


