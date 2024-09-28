
from .models import INSTITUTIONS
from rest_framework import viewsets

# Create your views here.

class InstitutionViewSet(viewsets.ModelViewSet):
    model = INSTITUTIONS
    queryset = INSTITUTIONS.objects.all()


