from rest_framework import serializers
from .models import Project, ProjectFile

class ProjectFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFile
        fields = ['id', 'file']

class ProjectSerializer(serializers.ModelSerializer):
    files = ProjectFileSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'tech_stack', 'files']

class ProjectCreateSerializer(serializers.ModelSerializer):
    files = serializers.ListField(
        child=serializers.FileField(max_length=100, allow_empty_file=False, use_url=False),
        write_only=True
    )
    tech_stack = serializers.ListField(
        child=serializers.CharField(max_length=100),  # A list of strings (tech stack)
    )

    class Meta:
        model = Project
        fields = ['title', 'description', 'tech_stack', 'files']

    def create(self, validated_data):
        files = validated_data.pop('files')  # Extract files from validated data
        tech_stack = validated_data.pop('tech_stack')  # Extract tech stack strings

        # Create the project
        project = Project.objects.create(**validated_data)
        project.tech_stack = tech_stack

        # Handle the file uploads and associate with the project
        for file in files:
            ProjectFile.objects.create(project=project, file=file)

        return project
