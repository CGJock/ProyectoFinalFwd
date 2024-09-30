from django.contrib import admin
from .models import Post, PostResponse


# Register your models here.
admin.site.register(Post)
admin.site.register(PostResponse)