from django.contrib.auth.models import AbstractUser,UserManager
from django.db import models
from django.utils import timezone
from rol.models import ROL
from django.conf import settings



# Create your models here.

    
    
class USERS(AbstractUser):
    id_user = models.AutoField(primary_key=True,unique=True)
    state = models.BooleanField(default=False)
    id_rol = models.ForeignKey(ROL, on_delete=models.CASCADE)
    dni_number = models.CharField(max_length=9, unique=True)
    sex = models.CharField(max_length=75)
    username = models.CharField(max_length=100 ,unique=True)
    crated_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    birth_date = models.DateField()
    name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=75)
    last_name = models.CharField(max_length=75)
    email = models.EmailField(max_length=100,unique=True)
    password = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=8)
    last_login = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    objects = UserManager() 
    REQUIRED_FIELDS = []
    
   
    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        # Asigna el rol de admin
        extra_fields['id_rol'] = 1  # Asigna el ID del rol administrator

        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user





    

    
    
    