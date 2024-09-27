from rest_framework.routers import DefaultRouter
from .views import  GradeViewSet

router_grade = DefaultRouter()


router_grade.register(r'grade', viewset=GradeViewSet, basename='register-grade')