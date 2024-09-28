from django.db import models
from django.utils import timezone
from rol.models import ROL
from grade.models import GRADE
from instituto.models import INSTITUTIONS

# Create your models here.

class USERS(models.Model):
    id_user = models.AutoField(primary_key=True)
    state = models.BooleanField(default=False)
    id_rol = models.ForeignKey(ROL, on_delete=models.CASCADE)
    dni_number = models.CharField(max_length=9, unique=True)
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
    

class STUDENT(models.Model):
    id_student = models.ForeignKey(USERS, on_delete=models.CASCADE)
    id_grade  = models.ForeignKey(GRADE, on_delete=models.CASCADE)
    id_institution  = models.ForeignKey(INSTITUTIONS, on_delete=models.CASCADE)
    government_subsidy  = models.BooleanField()
    scholarship = models.BooleanField()
    uuid = models.UUIDField(null=True, unique=True) 
    
    def __str__(self):
        return self.id_student
    

class PSYCHOLOGIST(models.Model):
    id_psychologist = models.ForeignKey(USERS, on_delete=models.CASCADE)
    license_code = models.CharField(max_length=100)
    availability   = models.BooleanField()
    years_experience  = models.IntegerField()
    
    def __str__(self):
        return self.id_psychologist
    


    

    
    
    