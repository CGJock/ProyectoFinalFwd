
# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .models import Book
from .serializers import BookSerializer

# Vista para listar y crear libros
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all().order_by('-added_date')
    serializer_class = BookSerializer
    permission_classes = [IsAdminUser]

    # Asignar el admin automáticamente al libro
    def perform_create(self, serializers):
        serializers.save(admin=self.request.user)  # El admin será el usuario autenticado