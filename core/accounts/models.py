from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class UserStack(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stack_name = models.CharField(max_length=50)
    stack_description = models.TextField()

    def __str__(self):
        return self.stack_name

class UserProjects(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=50)
    project_description = models.TextField()
    project_quantity = models.IntegerField()

    def __str__(self):
        return self.project_name
    
class UserContributions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(UserProjects, on_delete=models.CASCADE)
    contribution_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contribution_amount
