from rest_framework import serializers
from projects.models import Project
from .models import ProjectContribution

class ContributionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = ProjectContribution
        fields = ['id', 'user', 'project', 'contributed_at', 'contribution_type']
        read_only_fields = ['id', 'user', 'contributed_at']

    def validate_project(self, value):
        """Check if the project exists."""
        if not Project.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Project does not exist.")
        return value

    def validate_contribution_type(self, value):
        if not value:
            raise serializers.ValidationError("At least one contribution type is required.")
        return value

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)