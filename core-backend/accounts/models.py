from django.db import models

class User(models.Model):
    VOLUNTEER = 'volunteer'
    CONTRIBUTOR = 'contributor'
    
    USER_TYPES = (
        (VOLUNTEER, 'Volunteer'),
        (CONTRIBUTOR, 'Contributor'),
    )

    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    user_type = models.CharField(max_length=20, choices=USER_TYPES, default=VOLUNTEER)
    
    def __str__(self):
        return f"{self.name} ({self.user_type})"
    
    def is_volunteer(self):
        return self.user_type == self.VOLUNTEER
    
    def is_contributor(self):
        return self.user_type == self.CONTRIBUTOR


class UserStack(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stack_name = models.CharField(max_length=50)
    stack_description = models.TextField()

    def __str__(self):
        return self.stack_name



