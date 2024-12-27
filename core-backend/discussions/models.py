from django.db import models

# Create your models here.
class Discussion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class YourModel(models.Model):
    name = models.CharField(max_length=100)
    # Add a dummy field to trigger migration
    dummy_field = models.BooleanField(default=True)
