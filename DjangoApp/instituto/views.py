
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
<<<<<<< HEAD
   
=======
>>>>>>> 24047515c78a93722f0e3ce5393bfde5f34963e5
    
class InstitutionsList(viewsets.ReadOnlyModelViewSet):
    queryset = INSTITUTIONS.objects.all()
    serializer_class = InstitutoSerializer
    authentication_classes = [IsAuthenticated]
    


