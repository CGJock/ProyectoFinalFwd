
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny  

from student.models import STUDENT
from user.models import USERS
from student.serializers import StudentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny 



# Create your views here.
class RegisterStudentViewSet(viewsets.ModelViewSet):
    queryset = STUDENT.objects.all()
    serializer_class = StudentSerializer
     
    def create(self, request, *args, **kwargs):
        student_serializer = StudentSerializer(data=request.data)
        if student_serializer.is_valid():
            student_serializer.save()  
            return Response(student_serializer.data, status=status.HTTP_201_CREATED)
        else:  
            return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      

class StudentsUser(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]
    def list(self, request, ):
        # Recupera todos los estudiantes con sus usuarios relacionados
        students = STUDENT.objects.select_related('id_user','id_institution','id_grade').all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    
    
class  StudentUserDetail(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def retrieve(self,request,id_user):
        try:
            student = STUDENT.objects.select_related('id_user').get(id_user=id_user)

            serializer =  StudentSerializer(student)
        
        except  STUDENT.DoesNotExist:
            return Response({'error':'No se encontró a el estudiante'},status=404)

        return  Response(serializer.data, status=200)

    
    



