from django.urls import path
from . import views


urlpatterns = [
    path('api/library/', views.LibraryView.as_view(), name='library')
]