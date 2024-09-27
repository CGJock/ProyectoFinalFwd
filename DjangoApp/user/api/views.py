from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from user.models import USERS
from .forms import UserForm, StudentForm, PsychologistForm
from .serializers import UserSerializer, StudentSerializer, PsychologistSerializer



class RegisterUserViewSet(viewsets.ViewSet):
    
    def create(self, request):
        user_type = request.data.get('user_type')
        
        user_form =  UserForm(request.data)
        
        if user_form.is_valid():
            user = user_form.save(commit=False)  # Don't save yet, just create the instance
            user.save()  # Save the user instance


        
        # Crear y validar un estudiante
        if user_type == 'student':
            student_form = StudentForm(request.data)
            if student_form.is_valid():
                student_form.save()
                return Response(student_form.data, status=status.HTTP_201_CREATED)
            return Response(student_form.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Crear y validar un psicólogo
        elif user_type == 'psychologist':
            psychologist_form = PsychologistForm(request.data)
            if psychologist_form.is_valid():
                psychologist_form.save()
                return Response(psychologist_form.data, status=status.HTTP_201_CREATED)
            return Response(psychologist_form.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # En caso de que no se especifique un tipo válido
        return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        user_form = UserForm()  # Create an empty UserForm
        return Response({
            'user_form': user_form.as_p(),  # Return the base form as HTML
        })

    def retrieve(self, request, user_type):
        if user_type == 'student':
            student_form = StudentForm()  # Create an empty StudentForm
            return Response({
                'user_form': UserForm().as_p(),  # Return the base form
                'student_form': student_form.as_p(),  # Return the StudentForm as HTML
            })
        
        elif user_type == 'psychologist':
            psychologist_form = PsychologistForm()  # Create an empty PsychologistForm
            return Response({
                'user_form': UserForm().as_p(),  # Return the base form
                'psychologist_form': psychologist_form.as_p(),  # Return the PsychologistForm as HTML
            })

        return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)