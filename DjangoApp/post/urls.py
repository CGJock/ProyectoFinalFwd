from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, PostResponseViewSet  
from .router_post import router  

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# Registrar las rutas del enrutador para los posts
router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Ruta para gestionar las respuestas anidadas a un post
    path('posts/<int:post_id>/replies/', PostResponseViewSet.as_view({'get': 'list', 'post': 'create'}), name='post-replies'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
