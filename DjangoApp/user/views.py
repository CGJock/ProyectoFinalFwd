from django.shortcuts import render
from forms import UserForm, StudentForm, PsychologistForm
# Create your views here.

#se define la vista register_user
def register_user(request):
#Se piden los formularios vacios
    user_form = UserForm()
    student_form = StudentForm()
    psychologist_form = PsychologistForm()
    
    if request.method  == 'POST':
        user_type =  request.POST.get('user_type')
        if user_type  == 'student':
            student_form = StudentForm(request.POST)
            if student_form.is_valid():
                student_form.save()

        
        


