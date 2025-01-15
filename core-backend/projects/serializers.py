from rest_framework import serializers
from .models import Project, File

class ProjectSerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True, required=True)
    files = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'project_type', 'tech_stacks', 'file', 'files']
        read_only_fields = ['user', 'files']
    def create(self, validated_data):

        file_data = validated_data.pop('file')
        request = self.context.get('request')
        validated_data['user'] = request.user

        project = Project.objects.create(**validated_data)

        File.objects.create(project=project, file=file_data)

        return project

    def get_files(self, obj):
        return [{"id": f.id, "file": f.file.url, "uploaded_at": f.uploaded_at} for f in obj.files.all()]
