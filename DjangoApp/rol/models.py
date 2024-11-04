from django.db import models

# Create your models here.
class ROL(models.Model):
    id_rol  = models.IntegerField(primary_key=True)
    rol_name = models.CharField(max_length=100)
    