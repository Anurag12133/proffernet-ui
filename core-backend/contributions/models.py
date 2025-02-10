from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from projects.models import Project  # Import the Project model from the projects app

class ProjectContribution(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='project_contributions')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_contributions')
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