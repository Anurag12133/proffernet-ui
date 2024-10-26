from django.db import models

# Create your models here.
class Contributors(models.Model):
    user_id = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    project_id = models.ForeignKey('projects.Project', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.name} - {self.user.user_type()}"