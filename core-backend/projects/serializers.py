from rest_framework import serializers
from .models import Project

class ProjectCreateSerializer(serializers.ModelSerializer):
    tech_stacks = serializers.ListField( 
        child=serializers.CharField(max_length=100),
    )

    class Meta:
        model = Project
        fields = ['title', 'description', 'tech_stacks']  

    @staticmethod
    def create(validated_data): 
        tech_stacks = validated_data.pop('tech_stacks')
        project = Project.objects.create(**validated_data)
        project.tech_stacks = tech_stacks  
        project.save() 
        return project