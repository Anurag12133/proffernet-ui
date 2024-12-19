from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ProjectCreateSerializer, ProjectListSerializer
from .models import Project

class ProjectCreateAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)  

    @staticmethod
    def post(request, *args, **kwargs):
        serializer = ProjectCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProjectListAPIView(APIView):
    @staticmethod
    def get(request, *args, **kwargs):
        projects = Project.objects.all()  
        serializer = ProjectListSerializer(projects, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK) 