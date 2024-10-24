from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    """
    Vista para manejar operaciones CRUD de libros.
    Requiere autenticación y asegura que solo usuarios autenticados puedan interactuar con los libros.
    """

    queryset = Book.objects.all()  # Recupera todos los libros
    serializer_class = BookSerializer  # Usa el serializer que creaste
    permission_classes = [IsAuthenticated]  # Requiere que los usuarios estén autenticados

    def perform_create(self, serializer):
        """
        Sobrescribe el método de creación para asignar automáticamente el id_admin
        al usuario autenticado que realiza la petición.
        """
        serializer.save(id_admin=self.request.user)
