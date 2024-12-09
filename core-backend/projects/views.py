from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer, ProjectCreateSerializer


class ProjectCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ProjectCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        projects = Project.objects.prefetch_related('files').all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
