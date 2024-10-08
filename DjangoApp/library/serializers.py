from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id_book', 'title', 'author', 'url', 'added_date', 'id_admin']
        read_only_fields = ['added_date', 'id_admin']