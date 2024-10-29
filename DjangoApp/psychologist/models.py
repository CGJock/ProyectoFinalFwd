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
    assigned_to_hotline = models.BooleanField()
    years_experience  = models.IntegerField()
    
    def __str__(self):
        return str(self.id_psychologist)
    

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
    state = models.TextField(max_length=55,default='open')
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"El expediente de {self.id_pacient} se le asigno a  {self.id_psychologist}"
    

class SESSION(models.Model):
    id_session = models.CharField(max_length=100,blank=True,null=True)#se ligara al id de la conversacion de twilio
    id_expedient = models.ForeignKey(EXPEDIENT, related_name='Sessions', on_delete=models.CASCADE)
    session_date = models.DateTimeField(default=timezone.now)
    
class OBSERVATIONS(models.Model):
    id_observation = models.AutoField(primary_key=True)
    #cada observacion podra estar ligada unicamente a una session
    id_session = models.OneToOneField(SESSION, related_name='Obervations', on_delete=models.CASCADE)
    observation_description = models.TextField(max_length=255)
    created_at =models.DateTimeField(default=timezone.now)
    
    
    
class PACIENTFILES(models.Model):
    id_file = models.AutoField(primary_key=True)
    id_expedient = models.ForeignKey(EXPEDIENT,related_name='Files', on_delete=models.CASCADE)
    created_at =models.DateTimeField(default=timezone.now)
    file_name =models.CharField(max_length=55)
    file = models.FileField()
    
    


    
   

    
    
    
