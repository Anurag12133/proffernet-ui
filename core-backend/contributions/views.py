from rest_framework import generics, permissions
from .models import ProjectContribution
from .serializers import ContributionSerializer

class ContributionCreateView(generics.CreateAPIView):
    queryset = ProjectContribution.objects.all()
    serializer_class = ContributionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserContributionsListView(generics.ListAPIView):
    """
    API endpoint to list all contributions made by the authenticated user.
    """
    serializer_class = ContributionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter contributions by the authenticated user
        return ProjectContribution.objects.filter(user=self.request.user)