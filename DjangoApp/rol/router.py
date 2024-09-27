from rest_framework.routers import DefaultRouter
from .views import  RolViewSet

router_rol = DefaultRouter()


router_rol.register(r'rol', viewset=RolViewSet, basename='register-rol')
