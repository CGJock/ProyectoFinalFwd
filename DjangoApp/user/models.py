from django.contrib.auth.models import AbstractBaseUser,AbstractUser
from django.db import models
from django.utils import timezone
from rol.models import ROL

# Create your models here.

# class USERMANAGER(AbstractUser):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('Se debe ingresasr un correo')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)  #se guarda la password para el hash
#         user.save(using=self._db)
#         user.setpermissions_based_on_role()#para asignar permisos segun rol 
#         return user
    

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         return self.create_user(email, password, **extra_fields)
    
    
class USERS(AbstractUser):
    id_user = models.AutoField(primary_key=True)
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
    

     
    REQUIRED_FIELDS = []
 




    

    
    
    