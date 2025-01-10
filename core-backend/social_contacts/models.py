from django.db import models
from django.core.validators import URLValidator, RegexValidator
from django.conf import settings

class SocialDetails(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='social_details'
    )
    
    whatsapp_group_url = models.URLField(
        max_length=255,
        validators=[URLValidator()],
        blank=True,
        null=True
    )
    
    linkedin_url = models.URLField(
        max_length=255,
        validators=[URLValidator()],
        blank=True,
        null=True
    )
    
    github_url = models.URLField(
        max_length=255,
        validators=[URLValidator()],
        blank=True,
        null=True
    )
    
    whatsapp_number = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            )
        ],
        blank=True,
        null=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Social Details'
        verbose_name_plural = 'Social Details'
    
    def __str__(self):
        return f"Social details for {self.user.email}"