from rest_framework import serializers
from projects.models import Project, File
from .models import ProjectContribution

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'file', 'uploaded_at']

class ProjectSerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True, read_only=True)  # Include files in the response

    class Meta:
        model = Project
        fields = ['id', 'title', 'files']  # Include title and files



class ContributionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), write_only=True)  # Writable during POST
    project_details = ProjectSerializer(source='project', read_only=True)  # Read-only during GET

    class Meta:
        model = ProjectContribution
        fields = ['id', 'user', 'project', 'project_details', 'contributed_at', 'contribution_type']
        read_only_fields = ['id', 'user', 'contributed_at', 'project_details']

    def validate_project(self, value):
        """Ensure the project exists."""
        if not Project.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Project does not exist.")
        return value

    def validate_contribution_type(self, value):
        """Ensure at least one contribution type is provided."""
        if not value:
            raise serializers.ValidationError("At least one contribution type is required.")
        return value

    def create(self, validated_data):
        """Automatically set the user to the current user."""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)