from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
import uuid

class UserProfile(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    groups = models.ManyToManyField(
        Group,
        related_name="userprofile_set",  # Unique related name for groups
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="userprofile_permissions",  # Unique related name for user_permissions
        blank=True
    )
    username = models.CharField(
        max_length=150,
        unique=True,
        default=uuid.uuid4,  # Temporary default value for unique usernames
        error_messages={
            'unique': 'A user with that username already exists.'
        },
        validators=[AbstractUser.username_validator],
    )

    def __str__(self):
        return self.email
