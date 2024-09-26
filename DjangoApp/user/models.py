from django.db import models
from django.utils import timezone

# Create your models here.

class ROL(models.Model):
    id_rol  = models.AutoField(primary_key=True)
    rol_name = models.CharField(max_length=100)
    
class USERS(models.Model):
    id_user = models.AutoField(primary_key=True)
    state = models.BooleanField(default=False)
    id_rol = models.ForeignKey(ROL, on_delete=models.CASCADE)
    dni_number = models.CharField(max_length=9, unique=True)
    username = models.CharField(max_length=100)
    crated_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=75)
    birth_date = models.DateField()
    first_name = models.CharField(max_length=75)
    last_name = models.CharField(max_length=75)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=11)
    
    
    def __str__(self) -> str:
        return self.user_email
    


    
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
        return self.name
    
class STUDENT(models.Model):
    id_student = models.ForeignKey(USERS, on_delete=models.CASCADE)
    id_grade  = models.ForeignKey(GRADE, on_delete=models.CASCADE)
    id_institution  = models.ForeignKey(INSTITUTIONS, on_delete=models.CASCADE)
    goberment_subsidy  = models.BooleanField()
    scholarship = models.BooleanField()
    
    def __str__(self):
        return self.id_student
    

class PSYCHOLOGIST(models.Model):
    id_psychologist = models.ForeignKey(USERS, on_delete=models.CASCADE)
    diploma = models.CharField(max_length=100)
    aviability  = models.BooleanField()
    years_experience  = models.IntegerField()
    
    def __str__(self):
        return self.id_psychologist
    


    

    
    
    