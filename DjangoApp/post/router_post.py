from rest_framework import routers
from post.views import PostViewSet, PostResponseViewSet
# Se crea una instancia del enrutador por defecto de Django REST Framework
router = routers.DefaultRouter()
# Se registra el conjunto de vistas para las publicaciones
# El prefijo 'posts' se usará en las URL para acceder a las vistas de publicaciones.
# basename se utiliza para generar nombres únicos para las URL en el enrutador.
router.register(r'posts', PostViewSet, basename='post')
# Se registra el conjunto de vistas para las respuestas a las publicaciones
# El prefijo 'post-replies' se usará en las URL para acceder a las vistas de respuestas.
# basename se utiliza para generar nombres únicos para las URL en el enrutador.
router.register(r'post-replies', PostResponseViewSet, basename='postreplies')