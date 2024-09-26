from django.contrib import admin
from user.models import USERS

# Register your models here.

@admin.register(USERS)
class register_student(admin.ModelAdmin):
    list_display: {'user_id'}