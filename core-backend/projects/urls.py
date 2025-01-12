from django.urls import path
from .views import ProjectListCreateView, ProjeDetailsView

urlpatterns = [
    path('create/', ProjectListCreateView.as_view(), name='project-create'),
    path('list/', ProjeDetailsView.as_view(), name='project-list'),
]
