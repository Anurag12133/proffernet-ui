
from rest_framework import generics
from rest_framework import generics

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, get_object_or_404
from .models import SocialDetails
from .serializers import SocialDetailsSerializer
from projects.models import Project  # Import Project model


class CreateSocialDetailsView(generics.CreateAPIView):
    """ Allows a user to create multiple SocialDetails, one per project using project title """
    serializer_class = SocialDetailsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        project = self.request.data.get("project")

        if not project:
            raise ValidationError("Project ID is required.")

        # Ensure the project exists
        project = get_object_or_404(Project, id=project)

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
    """ Retrieve social details for a specific project using project title """
    serializer_class = SocialDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        project_title = self.request.query_params.get("project_title")

        if not project_title:
            raise ValidationError("Project title is required.")

        # Get the project by title
        project = get_object_or_404(Project, title=project_title)

        return get_object_or_404(SocialDetails, project=project)



class DeleteSocialDetailsView(generics.DestroyAPIView):
    """ Delete a user's SocialDetails for a specific project using project title """
    permission_classes = [IsAuthenticated]

    def get_object(self):
        project_title = self.request.query_params.get("project_title")

        if not project_title:
            raise ValidationError("Project title is required.")

        # Get the project by title
        project = get_object_or_404(Project, title=project_title)

        return get_object_or_404(SocialDetails, project=project)


    @staticmethod
    def get_queryset():
        return SocialDetails.objects.all()

