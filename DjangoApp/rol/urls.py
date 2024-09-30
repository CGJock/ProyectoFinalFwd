from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import RolViewList, RolViewSet

router_rol = DefaultRouter()

router_rol.register(prefix='register-rol',viewset=RolViewSet,basename='registro-rol')
router_rol.register(prefix='rols',viewset=RolViewList, basename='list-rols')
urlpatterns = [
    path('', include(router_rol.urls))
]
