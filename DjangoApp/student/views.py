
from rest_framework import viewsets, status
from rest_framework.response import Response

from student.models import STUDENT
from user.models import USERS
from student.serializers import StudentSerializer


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
      


class StudentListView(viewsets.ReadOnlyModelViewSet):
    queryset = STUDENT.objects.all()
    serializer_class = StudentSerializer
            

class StudentsUser(viewsets.ViewSet):
    
    def list(self, request, ):
        # Recupera todos los estudiantes con sus usuarios relacionados
        students = STUDENT.objects.select_related('id_user','id_institution').all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)



