from django.urls import path
from .views import ProjectListCreateView

urlpatterns = [
    path('create/', ProjectListCreateView.as_view(), name='project-create'),
]
