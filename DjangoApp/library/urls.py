from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet

# Crea un router para las rutas de la API de la biblioteca
router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Incluye las rutas del ViewSet
]
