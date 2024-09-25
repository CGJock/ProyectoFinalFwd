from django.db import models

# Create your models here.
class USERS(models.Model):
    id_user = models.CharField(max_length=9, primary_key=True)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    user_name = models.CharField(max_length=75)
    usert_birth_date = models.DateField()
    user_first_name = models.CharField(max_length=75)
    user_last_name = models.CharField(max_length=75)
    user_email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    user_phone_number = models.CharField(max_length=11)
    
    
    def __str__(self) -> str:
        return self.user_email