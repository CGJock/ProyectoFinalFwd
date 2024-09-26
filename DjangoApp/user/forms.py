from django import forms 
from .models import USERS

class UserForm(forms.ModelForm):
    class Meta:
        fields=['dni_number', 'username', 'name']