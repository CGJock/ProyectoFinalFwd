from rest_framework import viewsets, status
from rest_framework.response import Response
from user.models import USERS
from .serializers import UserSerializer


class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = USERS.objects.all()  # es el query que va utilizar  la view equivalente a un select  * from tabla

    serializer_class = UserSerializer  # define el serializador que se va a usar

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            user_id = user_serializer.instance.id_user
            # headers = self.get_success_headers(user_serializer.data)
            return Response({'user_id' : user_id},status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RegisterUserListView(viewsets.ReadOnlyModelViewSet):
    queryset = USERS.objects.all()
    serializer_class = UserSerializer
            

        
        

           

