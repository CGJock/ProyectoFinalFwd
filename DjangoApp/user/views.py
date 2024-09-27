# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from user.models import USERS, STUDENT, PSYCHOLOGIST


# class RegisterUserViewSet(viewsets.ViewSet):
    
    # def create(self, request):
    #     user_type = request.data.get('user_type')
        
    #     # Crear y validar un estudiante
    #     if user_type == 'student':
    #         student_serializer = StudentSerializer(data=request.data)
    #         if student_serializer.is_valid():
    #             student_serializer.save()
    #             return Response(student_serializer.data, status=status.HTTP_201_CREATED)
    #         return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    #     # Crear y validar un psicólogo
    #     elif user_type == 'psychologist':
    #         psychologist_serializer = PsychologistSerializer(data=request.data)
    #         if psychologist_serializer.is_valid():
    #             psychologist_serializer.save()
    #             return Response(psychologist_serializer.data, status=status.HTTP_201_CREATED)
    #         return Response(psychologist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    #     # En caso de que no se especifique un tipo válido
    #     return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)



        
        


