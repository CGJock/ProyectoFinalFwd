from django.db import models
from user.models import USERS

# Create your models here.


class PSYCHOLOGIST(models.Model):
    id_user = models.ForeignKey(USERS, on_delete=models.CASCADE)
    id_psychologist = models.AutoField(primary_key=True)
    license_code = models.CharField(max_length=100)
    availability   = models.BooleanField()
    years_experience  = models.IntegerField()
    
    def __str__(self):
        return self.id_psychologist
    
    
    
