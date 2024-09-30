from django.db import models
from user.models import USERS
from grade.models import GRADE
from instituto.models import INSTITUTIONS

# Create your models here.
class STUDENT(models.Model):
    id_student = models.ForeignKey(USERS, on_delete=models.CASCADE)
    id_grade  = models.ForeignKey(GRADE, on_delete=models.CASCADE)
    id_institution  = models.ForeignKey(INSTITUTIONS, on_delete=models.CASCADE)
    government_subsidy  = models.BooleanField()
    scholarship = models.BooleanField()
    
    
    