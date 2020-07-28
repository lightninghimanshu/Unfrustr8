from django.db import models


# Create your models here.
class User_own(models.Model):
    username = models.TextField(primary_key=True)
    password = models.TextField()
    team_id = models.TextField()
    def __str__(self):
        return self.username

class chat(models.Model):
    chat_text = models.TextField()
    team_id = models.TextField()
class Todo(models.Model):
    todo_text =  models.TextField()
    team_id = models.TextField()
    checked = models.BooleanField()

    def __str__(self):
        return self.todo_text
