# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer


@api_view(['GET'])
def get_projects(request):
    projects_list = Project.objects.all()
    data = ProjectSerializer(projects_list, many = True).data
    return Response(data)

@api_view(['POST'])
def create_project(request):
    serilized_data = ProjectSerializer(data=request.data)  
    if serilized_data.is_valid():
        serilized_data.save()
        return Response(serilized_data.data, status=status.HTTP_201_CREATED)
    return Response(serilized_data.errors, status=status.HTTP_400_BAD_REQUEST)
