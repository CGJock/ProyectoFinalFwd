"""
URL configuration for DjangoApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.views import RegisterUserViewSet,RegisterUserListView

router_user = DefaultRouter()


router_user.register(prefix='register-user', viewset=RegisterUserViewSet, basename='register-users')
# router_user.register(prefix='register-student', viewset=RegisterStudentViewSet, basename='register-student')
# router_user.register(prefix='register-pyschologist', viewset=RegisterPsychologistViewSet, basename='register-pyschologist')
router_user.register(prefix='users', viewset=RegisterUserListView, basename='user-list')


urlpatterns = [
    path('',include(router_user.urls))
]
