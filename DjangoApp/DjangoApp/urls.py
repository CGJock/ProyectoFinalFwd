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
from django.contrib import admin
from django.urls import path, include
from user.api.router import router_user
from post.router_post import router_post 
from rol.router import router_rol
from grade.router import router_grade
from post.router_post import router_post
from user.api.views import RegisterUserViewSet


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router_user.urls)),
    path('register/', RegisterUserViewSet.as_view({'post': 'create'}), name='register'),
    path('', include(router_rol.urls)),
    path('', include(router_grade.urls)),
    path('api/', include(router_post.urls))
    
]
