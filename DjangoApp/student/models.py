from django.db import models
from user.models import USERS
from grade.models import GRADE
from instituto.models import INSTITUTIONS
from psychologist.models  import PSYCHOLOGIST



# Create your models here.
class STUDENT(models.Model):
    id_user = models.ForeignKey(USERS,on_delete=models.CASCADE)
    id_student = models.AutoField(primary_key=True)
    id_grade  = models.ForeignKey(GRADE, on_delete=models.CASCADE)
    id_institution  = models.ForeignKey(INSTITUTIONS, on_delete=models.CASCADE)
    psychologist_in_charge = models.ForeignKey(PSYCHOLOGIST,related_name='pacient', on_delete=models.SET_NULL, null=True, blank=True)
    government_subsidy  = models.BooleanField()
    scholarship = models.BooleanField()
    
    
    