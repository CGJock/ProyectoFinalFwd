
from .models import INSTITUTIONS
from rest_framework import viewsets
from .serializers import InstitutoSerializer

# Create your views here.

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = INSTITUTIONS.objects.all()
    serializer_class = InstitutoSerializer
    
class InstitutionsList(viewsets.ReadOnlyModelViewSet):
    queryset = INSTITUTIONS.objects.all()
    serializer_class = InstitutoSerializer
    


