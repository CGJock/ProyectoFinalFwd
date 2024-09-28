from rest_framework import viewsets, status
from rest_framework.response import Response
from user.models import USERS, STUDENT, PSYCHOLOGIST
from .serializers import UserSerializer, StudentSerializer, PsychologistSerializer


class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()  # es el query que va utilizar  la view equivalente a un select  * from tabla

    serializer_class = UserSerializer  # define el serializador que se va a usar

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            
class RegisterStudentViewSet(viewsets.ModelViewSet):
    queryset = STUDENT.objects.all()
    serializer_class = StudentSerializer
     
    def create(self, request, *args, **kwargs):
        student_serializer = StudentSerializer(data=request.data)
        if student_serializer.is_valid():
            student_serializer.save  
            return Response(student_serializer.data, status=status.HTTP_201_CREATED)
        elif  student_serializer.errors:
            return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
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



           

