from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet
# Crea un router
router = DefaultRouter()

# Registra el BookViewSet
router.register(r'books', BookViewSet)
