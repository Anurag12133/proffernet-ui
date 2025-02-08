# socials/views.py
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, get_object_or_404
from .models import SocialDetails
from .serializers import SocialDetailsSerializer
from projects.models import Project  # Import Project model


class CreateSocialDetailsView(generics.CreateAPIView):
    """ Allows a user to create multiple SocialDetails, one per project """
    serializer_class = SocialDetailsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        project_id = self.request.data.get("project")

        if not project_id:
            raise ValidationError("Project ID is required.")

        # Ensure the project exists
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise ValidationError("Invalid Project ID.")

        # Ensure the user does not have duplicate social details for the same project
        if SocialDetails.objects.filter(project=project).exists():
            raise ValidationError("Social details already exist for this project.")

        serializer.save(project=project)


class GetUserSocialDetailsView(ListAPIView):
    """ Retrieve all SocialDetails of a user across multiple projects """
    serializer_class = SocialDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SocialDetails.objects.all()  # Return all records (across projects)


class GetSocialDetailsByProjectView(generics.RetrieveAPIView):
    """ Retrieve social details for a specific project """
    serializer_class = SocialDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        project_id = self.request.query_params.get("project_id")

        if not project_id:
            raise ValidationError("Project ID is required.")

        return get_object_or_404(SocialDetails, project_id=project_id)


class DeleteSocialDetailsView(generics.DestroyAPIView):
    """ Delete a user's SocialDetails for a specific project """
    permission_classes = [IsAuthenticated]

    def get_object(self):
        project_id = self.request.query_params.get("project_id")

        if not project_id:
            raise ValidationError("Project ID is required.")

        return get_object_or_404(SocialDetails, project_id=project_id)
