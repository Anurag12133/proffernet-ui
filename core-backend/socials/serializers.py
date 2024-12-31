from rest_framework import serializers
from .models import Social

class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = ['id', 'user', 'whatsapp_url', 'github_link', 'linkedin_link', 'whatsapp_number']
        extra_kwargs = {
            'user': {'read_only': True},
        }
