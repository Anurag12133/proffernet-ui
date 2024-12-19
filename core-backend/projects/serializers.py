from rest_framework import serializers
from .models import Project, File

class ProjectCreateSerializer(serializers.ModelSerializer):
    tech_stacks = serializers.ListField(
        child=serializers.CharField(max_length=100),
        allow_empty=True
    )
    files = serializers.ListField(
        child=serializers.FileField(),
        write_only=True,
        allow_empty=True
    )

    class Meta:
        model = Project
        fields = ['title', 'description', 'tech_stacks', 'files']  

    @staticmethod
    def create(validated_data): 
        tech_stacks = validated_data.pop('tech_stacks')
        files_data = validated_data.pop('files', [])
    
        project = Project.objects.create(**validated_data)
        project.tech_stacks = tech_stacks  
        project.save() 
        
        for file in files_data:
            File.objects.create(project=project, file=file)
        
        return project
    
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'file', 'uploaded_at'] 
    

class ProjectListSerializer(serializers.ModelSerializer):
    tech_stacks = serializers.ListField(
        child=serializers.CharField(max_length=100),
        allow_empty=True
    )
    files = FileSerializer(many=True, read_only=True)  

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'tech_stacks', 'files']
    
