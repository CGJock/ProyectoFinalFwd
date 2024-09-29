

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  GradeViewSet, GradeViewList

router_grade = DefaultRouter()

router_grade.register(prefix='register-grade', viewset=GradeViewSet, basename='register-grade')
router_grade.register(prefix='grades',  viewset=GradeViewList, basename='grades')



urlpatterns = [
    path('',include(router_grade.urls))
]
