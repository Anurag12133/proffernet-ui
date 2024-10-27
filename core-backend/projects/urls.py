from django.urls import path, include
from .views import ProjectViewSet
from rest_framework.routers import DefaultRouter

project_router = DefaultRouter()
project_router.register(r'projects', ProjectViewSet, basename='project')
