from django.contrib import admin
from .models import Social

@admin.register(Social)
class SocialAdmin(admin.ModelAdmin):
    list_display = ('user', 'github_link', 'linkedin_link', 'whatsapp_url', 'whatsapp_number')
    search_fields = ('user__username', 'github_link', 'linkedin_link')
