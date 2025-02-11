# socials/serializers.py
from rest_framework import serializers
from .models import SocialDetails

class SocialDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialDetails
        fields = ['project', 'whatsapp_group_url', 'linkedin_url', 'github_url', 'whatsapp_number']

    def create(self, validated_data):
        return SocialDetails.objects.create(**validated_data)
