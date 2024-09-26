from django import forms 
from .models import USERS, STUDENT, PSYCHOLOGIST

class UserForm(forms.ModelForm):
    class Meta:
        model=USERS
        fields=['dni_number', 'username', 'name','birth_date', 'first_name','last_name', 'email', 'password', 'phone_number']
 
 
 #la clase meta de student heredara el user form     
class StudentForm(UserForm):
    class Meta(UserForm.Meta):
        model=STUDENT
        fields= UserForm.Meta.fields + ['id_grade', 'id_institution', 'goberment_subsidy', 'scholarship']
        
class PsychologistForm(UserForm):
    class Meta(UserForm.Meta):
        model=PSYCHOLOGIST
        fields= UserForm.Meta.fields + ['diploma', 'aviability', 'years_experience']   
        
    