
from rol.models import ROL
from .serializers import RolSerializer
from rest_framework import viewsets

# Create your views here.
class RolViewSet(viewsets.ModelViewSet):
    queryset = ROL.objects.all()
    serializer_class = RolSerializer