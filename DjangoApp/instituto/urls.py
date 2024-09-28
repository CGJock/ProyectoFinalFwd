from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import  InstitutionViewSet

router_instituto = DefaultRouter()

router_instituto.register(prefix='register-institution',viewset=InstitutionViewSet, basename='register-institution')

urlpatterns = [
    path('', include(router_instituto.urls)),
]
