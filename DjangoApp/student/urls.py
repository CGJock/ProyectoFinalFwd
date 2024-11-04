from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import RegisterStudentViewSet,StudentsUser,StudentUserDetail

router_student = DefaultRouter()

router_student.register(prefix='register-student',viewset=RegisterStudentViewSet,basename='registro-student')
router_student.register(prefix='all-students',viewset=StudentsUser, basename='all-students')
urlpatterns = [
    path('', include(router_student.urls)),
    path('student-detailed/<int:id_user>/', StudentUserDetail.as_view({'get': 'retrieve'}), name='student-detailed')
]
