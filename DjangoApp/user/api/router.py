from rest_framework.routers import DefaultRouter
from .views import RegisterUserViewSet  

router_user = DefaultRouter()
router_user.register(r'register', viewset=RegisterUserViewSet, basename='register-user')
