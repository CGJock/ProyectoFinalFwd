from django.db import models
from django.utils import timezone
from rol.models import ROL

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
    first_name = models.CharField(max_length=75)
    last_name = models.CharField(max_length=75)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=11)
    
    
    def __str__(self) -> str:
        return self.email
    
class INSTITUTIONS(models.Model):
    id_institution = models.AutoField(primary_key=True)
    institution_name  = models.CharField(max_length=150)
    public_institution = models.BooleanField()
    institution_address = models.CharField(max_length=200)
    
    def __str__(self):
        return self.id_institution
    

class GRADE(models.Model):
    id_grade = models.AutoField(primary_key=True)
    grade_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.grade_name
    
class STUDENT(USERS):
    id_grade  = models.ForeignKey(GRADE, on_delete=models.CASCADE, related_name='students')
    id_institution  = models.ForeignKey(INSTITUTIONS, on_delete=models.CASCADE)
    gobernment_subsidy  = models.BooleanField()
    scholarship = models.BooleanField()
    uuid = models.UUIDField(null=True, unique=True) 
    
    def __str__(self):
        return self.id_student
    

class PSYCHOLOGIST(USERS):
    license_code = models.CharField(max_length=100)
    availability   = models.BooleanField()
    years_experience  = models.IntegerField()
    
    def __str__(self):
        return self.id_psychologist
    


    

    
    
    