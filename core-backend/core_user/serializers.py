from rest_framework.serializers import ModelSerializer
from .models import CustomUserModel
from  django.conf import settings

class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = [
            "userId",
            "username",
            "email",
            "password",
        ]
        def create(self, validated_data):
            user = CustomUserModel.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user