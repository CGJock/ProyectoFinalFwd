from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet
from .router_post import router



router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('api/post/', include(router.urls))
   
]