from rest_framework.routers import DefaultRouter
from api.views import UserApiViewSet

router_user = DefaultRouter()

router_user.register(prefix='user', basename='user',viewset=UserApiViewSet)