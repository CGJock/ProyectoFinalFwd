from django.urls import path
from .views import PsychologistConversatoinView

urlpatterns = [
    path('api/conversation-psychologist/', PsychologistConversatoinView.as_view(), name='psicologo-disponible'),
]