from django.db import models
from django.contrib.auth.models import User

class Social(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="socials"
    )
    whatsapp_url = models.URLField(blank=True, null=True)  # Optional
    github_link = models.URLField(blank=False, null=False)  # Mandatory
    linkedin_link = models.URLField(blank=False, null=False)  # Mandatory
    whatsapp_number = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.user.username} Socials"
