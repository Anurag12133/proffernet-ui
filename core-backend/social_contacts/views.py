from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from .models import SocialDetails
from .serializers import SocialDetailsSerializer


class SocialDetailsView(generics.RetrieveUpdateAPIView):
    serializer_class = SocialDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(SocialDetails, user=self.request.user)

class CreateSocialDetailsView(generics.CreateAPIView):
    serializer_class = SocialDetailsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if SocialDetails.objects.filter(user=self.request.user).exists():
            raise ValidationError("Social details already exist for this user")
        serializer.save(user=self.request.user)

class DeleteSocialDetailsView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(SocialDetails, user=self.request.user)


class GetContactDetailsView(ListAPIView):
    serializer_class = SocialDetailsSerializer
    permission_classes = [AllowAny]  # Allow public access

    def get_queryset(self):
        return SocialDetails.objects.all()