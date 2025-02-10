from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings

class Project(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='projects', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    project_type = models.CharField(max_length=50, default='personal')
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


class Contribution(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='contributions')
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='contributions')
    contributed_at = models.DateTimeField(auto_now_add=True)
    contribution_type = ArrayField(
        models.CharField(max_length=50),
        blank=True,
        default=list,
    )

    class Meta:
        ordering = ['-contributed_at']
        unique_together = ['user', 'project']

    def __str__(self):
        return f"{self.user.username} contributed to {self.project.title}"

