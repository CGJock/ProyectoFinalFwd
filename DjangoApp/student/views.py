
from rest_framework import viewsets, status
from rest_framework.response import Response 
from student.models import STUDENT
from student.serializers import StudentSerializer


# Create your views here.
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
      


class StudentListView(viewsets.ReadOnlyModelViewSet):
    queryset = STUDENT.objects.all()
    serializer_class = StudentSerializer
            



