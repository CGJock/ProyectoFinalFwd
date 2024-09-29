from grade.models import GRADE
from .serializers import GradeSerializer
from rest_framework import viewsets


# Create your views here.
class GradeViewSet(viewsets.ModelViewSet):
    queryset = GRADE.objects.all()
    serializer_class = GradeSerializer
    
class  GradeViewList(viewsets.ReadOnlyModelViewSet):
    queryset = GRADE.objects.all()
    serializer_class =  GradeSerializer


    
