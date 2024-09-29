from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet
from .router_post import router_post



router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router_post.urls))
   
]