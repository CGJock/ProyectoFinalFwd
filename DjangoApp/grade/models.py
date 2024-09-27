from django.db import models

# Create your models here.
class GRADE(models.Model):
    id_grade = models.IntegerField(primary_key=True)
    grade_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.grade_name