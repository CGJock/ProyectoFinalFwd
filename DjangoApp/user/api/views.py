from rest_framework import viewsets, status
from rest_framework.response import Response
from user.models import USERS, ROL
from .serializers import UserSerializer, StudentSerializer, PsychologistSerializer


class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()  # Asegúrate de tener un queryset definido
    serializer_class = UserSerializer  # Usar el serializador para usuarios

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)
        user_role = user.id_rol
        if user_serializer.is_valid():
            user = user_serializer.save()  # Guarda el usuario
            # Dependiendo del rol, usa un serializador distinto
            if user_role.pk == 2 :
                student_serializer = StudentSerializer(data=request.data)
                if student_serializer.is_valid():
                    student_serializer.save(user=user)  # Asocia el estudiante con el usuario
                    return Response(student_serializer.data, status=status.HTTP_201_CREATED)
                return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            elif user.role == 'psychologist':
                psychologist_serializer = PsychologistSerializer(data=request.data)
                if psychologist_serializer.is_valid():
                    psychologist_serializer.save(user=user)  # Asocia el psicólogo con el usuario
                    return Response(psychologist_serializer.data, status=status.HTTP_201_CREATED)
                return Response(psychologist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


