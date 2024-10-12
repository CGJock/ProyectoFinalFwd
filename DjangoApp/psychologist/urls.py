from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import  RegisterPsychologistViewSet,PychologistsList,CreateCase

router_psychologist = DefaultRouter()

router_psychologist.register(prefix='register-psychologist',viewset=RegisterPsychologistViewSet, basename='register-psychologist')
router_psychologist.register(prefix='psychologists',viewset=PychologistsList, basename='list-psychologists')
router_psychologist.register(prefix='create-case',viewset=CreateCase,basename='create_case')
urlpatterns = [
    path('', include(router_psychologist.urls)),
]
