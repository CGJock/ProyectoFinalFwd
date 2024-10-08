from django.db import models
from user.models import USERS



class Post(models.Model):
    post_id  = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(USERS, on_delete= models.CASCADE, )
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    image_url = models.URLField(max_length=500, null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True)
    comment_count = models.PositiveIntegerField(default=0)
    modification_date = models.DateField(auto_now=True)


    def __str__(self):
        return self.title
    
class PostReplies(models.Model):

    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='replies')
    replies_id =  models.AutoField(primary_key=True)
    id_user = models.ForeignKey(USERS, on_delete=models.CASCADE,related_name='replies_as_id_user')
    description = models.TextField()
    replies_date = models.DateField(auto_now_add=True)
    like_count = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)
    
    def __str__(self):
        return f'Replies by {self.user_id} on {self.post.title}'

    
