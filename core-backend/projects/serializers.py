# serializers.py
from rest_framework import serializers
from .models import Project, ProjectImage


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image']


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'tech_stack', 'images']


class ProjectCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(max_length=100, allow_empty_file=False, use_url=False),
        write_only=True
    )

    class Meta:
        model = Project
        fields = ['title', 'description', 'tech_stack', 'images']

    @staticmethod
    def create(validated_data):
        images = validated_data.pop('images')
        project = Project.objects.create(**validated_data)
        for image in images:
            ProjectImage.objects.create(project=project, image=image)
        return project

    
