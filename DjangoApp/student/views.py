
from rest_framework import viewsets, status
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import USERS
from student.models import STUDENT
from student.serializers import StudentSerializer


# Create your views here.
@api_view['POST']
def register_student(request):
    user_data = request.data.pop('user')
    user = USERS.objects.create_user(**user_data)
    
    student_data = request.data
    student_data['user'] = user.id
    
    StudentSerializer = StudentSerializer(data=student_data)
    if StudentSerializer.isvalid():
        StudentSerializer.save()
        return Response(StudentSerializer.data, status=status.HTTP_201_CREATED)
    
    return Response(StudentSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentListView(viewsets.ReadOnlyModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = StudentSerializer
            



# class RegisterStudentViewSet(viewsets.ModelViewSet):
#     queryset = STUDENT.objects.all()
#     serializer_class = StudentSerializer
     
#     def create(self, request, *args, **kwargs):
#         student_serializer = StudentSerializer(data=request.data)
#         if student_serializer.is_valid():
#             student_serializer.save  
#             return Response(student_serializer.data, status=status.HTTP_201_CREATED)
#         elif  student_serializer.errors:
#             return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
