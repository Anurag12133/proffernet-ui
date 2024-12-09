from django.urls import path
from .views import ProjectCreateAPIView, ProjectListAPIView

urlpatterns = [
    path('create/', ProjectCreateAPIView.as_view(), name='project-create'),
    path('list/', ProjectListAPIView.as_view(), name='project-list'),
]
