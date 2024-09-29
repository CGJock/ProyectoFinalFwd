from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import StudentListView,RegisterStudentViewSet

router_student = DefaultRouter()

router_student.register(prefix='register-student',viewset=RegisterStudentViewSet,basename='registro-student')
router_student.register(prefix='students',viewset=StudentListView, basename='list-students')
urlpatterns = [
    path('', include(router_student.urls))
]
