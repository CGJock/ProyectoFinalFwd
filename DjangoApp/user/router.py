from rest_framework.routers import DefaultRouter
from .views import RegisterUserViewSet, RegisterStudentViewSet, RegisterPsychologistViewSet

router_user = DefaultRouter()


router_user.register(prefix='register-user', viewset=RegisterUserViewSet, basename='register-users')
router_user.register(prefix='register-student', viewset=RegisterStudentViewSet, basename='register-student')
router_user.register(prefix='register-pyschologist', viewset=RegisterPsychologistViewSet, basename='register-pyschologist')


    
