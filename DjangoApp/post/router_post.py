from rest_framework import routers
from .views import userViewSet, PostViewSet, PostResponseViewSet

router_post = routers.DefaultRouter()
router_post.register(r'users', userViewSet, basename='user')
router_post.register(r'posts', PostViewSet, basename='post')
router_post.register(r'post-responses', PostResponseViewSet, basename='postresponse')
