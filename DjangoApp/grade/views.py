from grade.models import GRADE
from .serializers import GradeSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny  



# Create your views here.
class GradeViewSet(viewsets.ModelViewSet):
    queryset = GRADE.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [IsAuthenticated]
    
    
class  GradeViewList(viewsets.ReadOnlyModelViewSet):
    queryset = GRADE.objects.all()
    serializer_class =  GradeSerializer
    permission_classes = [IsAuthenticated]


    
