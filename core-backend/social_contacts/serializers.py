# socials/serializers.py
from rest_framework import serializers
from .models import SocialDetails

class SocialDetailsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.first_name', read_only=True)
    class Meta:
        model = SocialDetails
        fields = ['user', 'username', 'whatsapp_group_url', 'linkedin_url', 'github_url', 'whatsapp_number']

    def create(self, validated_data):
        user = self.context['request'].user
        social_details, created = SocialDetails.objects.get_or_create(
            user=user,
            defaults=validated_data
        )
        if not created:
            for attr, value in validated_data.items():
                setattr(social_details, attr, value)
            social_details.save()
        return social_details

