from django.db import models




class Project(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    tech_stack = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title

class ProjectFile(models.Model):
    project = models.ForeignKey(Project, related_name='files', on_delete=models.CASCADE, blank=True)
    file = models.ImageField(upload_to='project_files/')

    def __str__(self):
        return f"Image for {self.project.title}"
