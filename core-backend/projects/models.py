from django.db import models
from django.contrib.postgres.fields import ArrayField

class Project(models.Model):
    title = models.CharField(max_length=100)  # Increased max_length for title
    description = models.TextField()
    tech_stacks = ArrayField(models.CharField(max_length=50), size=20, default=list, blank=True)

    class Meta:
        ordering = ['title']  

    def __str__(self):
        return self.title

