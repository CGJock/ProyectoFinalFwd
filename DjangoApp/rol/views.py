from rol.models import ROL
from .serializers import RolSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny  
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class RolViewSet(viewsets.ModelViewSet):
    queryset = ROL.objects.all()
    serializer_class = RolSerializer
    permission_classes = [IsAuthenticated]
    
class RolViewList(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ROL.objects.all()
    serializer_class = RolSerializer
    