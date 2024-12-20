from django.db import models
from user.models import USERS



class Post(models.Model):
    """
    Modelo que representa una publicación en la plataforma.
    """
    post_id  = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(USERS, on_delete= models.CASCADE )
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    image_url = models.URLField(max_length=500, null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True)
    comment_count = models.PositiveIntegerField(default=0)
    modification_date = models.DateField(auto_now=True)


    def __str__(self):
        """Devuelve una representación en cadena del título de la publicación."""
        return self.title
    
class PostReplies(models.Model):
    """Modelo que representa una respuesta a una publicación.
    """
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='replies')
    replies_id =  models.AutoField(primary_key=True)
    id_user = models.ForeignKey(USERS, on_delete=models.CASCADE,related_name='replies_as_id_user')
    description = models.TextField()
    replies_date = models.DateField(auto_now_add=True)
    like_count = models.IntegerField(default=0)

    
    def __str__(self):
        """Devuelve una representación en cadena de la respuesta indicando el usuario y la publicación."""
        return f'Replies by {self.id_user} on {self.post_id.title}'
    
    
class FRIENDS(models.Model):
    user = models.ForeignKey(USERS, related_name='friends', on_delete=models.CASCADE)
    friend = models.ForeignKey(USERS, related_name='friend_of', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'friend')
    
    def __str__(self):
        return f"{self.user.username} es amigo de {self.friend.username}"
 

    
