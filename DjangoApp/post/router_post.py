from rest_framework import routers
from post.views import PostViewSet, PostResponseViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'post-responses', PostResponseViewSet, basename='postresponse')