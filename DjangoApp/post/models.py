from django.db import models
from user.models import USERS



class Post(models.Model):
    USERS = models.ForeignKey(USERS, on_delete= models.CASCADE)
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
    USERS = models.ForeignKey(USERS, on_delete=models.CASCADE)
    like_count = models.IntegerField(default=0)
    def __str__(self):
        return f'Response by {self.USERS.USERSname} on {self.post.title}'
    
