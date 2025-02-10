from rest_framework import serializers
from projects.models import Project, File
from .models import ProjectContribution

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'file', 'uploaded_at']

class ProjectSerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'files']


class ContributionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    project_title = serializers.CharField(write_only=True)  # Accept project title instead of ID
    project_details = ProjectSerializer(source='project', read_only=True)

    class Meta:
        model = ProjectContribution
        fields = ['id', 'user', 'project_title', 'project_details', 'contributed_at', 'contribution_type']
        read_only_fields = ['id', 'user', 'contributed_at', 'project_details']

    def validate_project_title(self, value):
        """Ensure the project with the given title exists."""
        try:
            project = Project.objects.get(title=value)
        except Project.DoesNotExist:
            raise serializers.ValidationError("Project with this title does not exist.")
        return project

    def validate_contribution_type(self, value):
        """Ensure at least one contribution type is provided."""
        if not value:
            raise serializers.ValidationError("At least one contribution type is required.")
        return value

    def create(self, validated_data):
        """Retrieve project using title and create contribution."""
        project = validated_data.pop('project_title')
        validated_data['project'] = project
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
