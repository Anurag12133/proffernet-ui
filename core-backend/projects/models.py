from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    tech_stack = models.JSONField(default=list)

    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='project_images/')

    def __str__(self):
        return f"Image for {self.project.title}"
