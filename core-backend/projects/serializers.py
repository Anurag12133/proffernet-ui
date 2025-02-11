from rest_framework import serializers
from .models import Project, File, Contribution

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

    @staticmethod
    def get_files(obj):
        return [{"id": f.id, "file": f.file.url, "uploaded_at": f.uploaded_at} for f in obj.files.all()]

class ContributionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Automatically set to the current user
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Contribution
        fields = ['id', 'user', 'project', 'contributed_at', 'contribution_type']
        read_only_fields = ['id', 'user', 'contributed_at']

    def validate_contribution_type(self, value):
        """Validate that the contribution_type is a non-empty list."""
        if not value:
            raise serializers.ValidationError("At least one contribution type is required.")
        return value

    def create(self, validated_data):
        """Automatically set the user to the current user."""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
