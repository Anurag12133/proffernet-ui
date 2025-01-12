from rest_framework import serializers
from .models import Project, File

class ProjectSerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True, required=True)  # File upload during project creation
    files = serializers.SerializerMethodField()  # Nested files for response

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'project_type', 'tech_stacks', 'file', 'files']
        read_only_fields = ['user', 'files']  # Prevent user assignment via API

    def create(self, validated_data):
        # Extract the file from validated data
        file_data = validated_data.pop('file')
        request = self.context.get('request')  # Get the request context
        validated_data['user'] = request.user  # Assign the logged-in user

        # Create the project
        project = Project.objects.create(**validated_data)

        # Create the associated file
        File.objects.create(project=project, file=file_data)

        return project

    def get_files(self, obj):
        # Serialize associated files for the response
        return [{"id": f.id, "file": f.file.url, "uploaded_at": f.uploaded_at} for f in obj.files.all()]
