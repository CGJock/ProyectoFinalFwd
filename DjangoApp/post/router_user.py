from rest_framework import routers
from .views import UserViewSet, PostViewSet, PostResponseViewSet

router_user = routers.DefaultRouter()
router_user.register(r'users', UserViewSet, basename='user')
router_user.register(r'posts', PostViewSet, basename='post')
router_user.register(r'post-responses', PostResponseViewSet, basename='postresponse')
