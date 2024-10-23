from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, PostResponseViewSet  
from .router_post import router  

# Registrar las rutas del enrutador para los posts
router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Ruta para gestionar las respuestas anidadas a un post
    path('posts/<int:post_id>/replies/', PostResponseViewSet.as_view({'get': 'list', 'post': 'create'}), name='post-replies'),
]
