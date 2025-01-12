from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import ProjectSerializer
from rest_framework.response import Response

class ProjectListCreateView(generics.ListCreateAPIView):
    """
    Handles listing all projects for the authenticated user
    and creating a new project with a file.
    """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # To handle file uploads

    def get_queryset(self):
        # Restrict projects to the logged-in user
        return Project.objects.filter(user=self.request.user)

class ProjeDetailsView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=200)