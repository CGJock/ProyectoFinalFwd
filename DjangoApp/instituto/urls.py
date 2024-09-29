from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import  InstitutionViewSet, InstitutionsList

router_instituto = DefaultRouter()

router_instituto.register(prefix='register-institution',viewset=InstitutionViewSet, basename='register-institution')
router_instituto.register(prefix='institutions',viewset=InstitutionsList, basename='list-institution')
urlpatterns = [
    path('', include(router_instituto.urls)),
]
