from django.db import models
from django.contrib.postgres.fields import ArrayField

class Project(models.Model):
    title = models.CharField(max_length=100)  
    description = models.TextField()
    tech_stacks = ArrayField(models.CharField(max_length=50), size=20, default=list, blank=True)

    class Meta:
        ordering = ['title']  

    def __str__(self):
        return self.title


class File(models.Model):
    project = models.ForeignKey(Project, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='project_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['uploaded_at']

    def __str__(self):
        return f"{self.file.name} uploaded to {self.project.title}"