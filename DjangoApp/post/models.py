from django.db import models


class User(models.Model):
    
    dni_number = models.CharField(max_length=20, unique=True)
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=8, unique=True)
    birth_date = models.DateField()
    create_at = models.DateField(auto_now_add=True)
    
    type_rol = models.ForeignKey('Rol', on_delete=models.SET_NULL, null=True)
    
    
    def __str__(self):
        return self.username
    
class Rol(models.Model):
    rol_name = models.CharField(max_length=50)

    def __str__(self):
        return self.rol_name

class Post(models.Model):
    User = models.ForeignKey(User, on_delete= models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    image_url = models.URLField(max_length=500, null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True)
    comment_count = models.PositiveIntegerField(default=0)
    modification_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.title
    
class PostResponse(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='responses')
    description = models.TextField()
    response_date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    like_count = models.IntegerField(default=0)
    def __str__(self):
        return f'Response by {self.user.username} on {self.post.title}'
    
    