from django.db import models

# Create your models here.
class INSTITUTIONS(models.Model):
    id_institution = models.AutoField(primary_key=True)
    institution_name  = models.CharField(max_length=150)
    public_institution = models.BooleanField()
    institution_address = models.CharField(max_length=200)
    
    def __str__(self):
        return str(self.id_institution)