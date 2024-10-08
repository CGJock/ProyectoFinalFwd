from django.db import models
from django.contrib.auth.models import User  
from django.conf import settings

class Book(models.Model):
    id_book = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    added_date = models.DateTimeField(auto_now_add=True)
    id_admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title