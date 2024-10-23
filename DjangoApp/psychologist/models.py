from django.db import models
from user.models import USERS
from django.utils import timezone


# Create your models here.


class PSYCHOLOGIST(models.Model):
    id_user = models.ForeignKey(USERS, on_delete=models.CASCADE)
    id_psychologist = models.AutoField(primary_key=True)
    pacient_count = models.IntegerField(default=0)
    license_code = models.CharField(max_length=100)
    availability   = models.BooleanField()
    years_experience  = models.IntegerField()
    
    def __str__(self):
        return self.id_psychologist
    

class TICKET(models.Model):
    id_ticket = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(USERS, on_delete=models.CASCADE)
    crated_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    state = models.CharField(default='pending', max_length=55)
    
class EXPEDIENT(models.Model):
    id_expedient = models.AutoField(primary_key=True)
    id_pacient  = models.ForeignKey(USERS, on_delete=models.CASCADE)
    id_psychologist = models.ForeignKey(PSYCHOLOGIST, on_delete=models.CASCADE)
    observations = models.TextField(max_length=250, blank=True, null=True)
    crated_at = models.DateTimeField(default=timezone.now)
    
class PACIENTFILES(models.Model):
    id_file = models.AutoField(primary_key=True)
    id_expedient = models.ForeignKey(EXPEDIENT, on_delete=models.CASCADE)
    file = models.FileField()

    
    
    
    
    
