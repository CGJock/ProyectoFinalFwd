from django.db import models

# Create your models here.
class USERS(models.model):
    id_user = models.CharField(max_length=8)
    created_at = modes.da
    user_name = models.CharField(max_length=75)
    user_first_name = models.CharField(max_length=75)
    user_second_name = models.CharField(max_length=75)
    
    