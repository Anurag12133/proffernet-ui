from rest_framework import serializers
from .models import User

class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'is_verified']

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()