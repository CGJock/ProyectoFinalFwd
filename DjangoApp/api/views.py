from rest_framework.viewsets import ModelViewSet
from user.models import USERS
from user.serializers import UserSerializer

# Create your views here.
class UserApiViewSet(ModelViewSet):
    serializer_class = UserSerializer
    serializer = UserSerializer,
    queryset =  USERS.objects.all()


