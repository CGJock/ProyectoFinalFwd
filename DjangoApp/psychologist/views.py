from django.shortcuts import render
from .models import PSYCHOLOGIST
from rest_framework import viewsets
from .serializers import PsychologistSerializer
from rest_framework.response import Response
from rest_framework import status

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


