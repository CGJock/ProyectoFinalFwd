from django.db import models
from django.utils import timezone
from rol.models import ROL

# Create your models here.

class USERS(models.Model):
    id_user = models.AutoField(primary_key=True)
    state = models.BooleanField(default=False)
    id_rol = models.ForeignKey(ROL, on_delete=models.CASCADE)
    dni_number = models.CharField(max_length=9, unique=True)
    sex = models.CharField(max_length=75)
    username = models.CharField(max_length=100)
    crated_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    birth_date = models.DateField()
    name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=75)
    last_name = models.CharField(max_length=75)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=11)
    
    
    def __str__(self) -> str:
        return self.email
    




    

    
    
    