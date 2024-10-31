from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    # uploaded_by = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    # updated_at = models.DateTimeField(auto_now=True)
    # is_active = models.BooleanField(default=True)
    # is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title
