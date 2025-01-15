from django.urls import path
from .views import ProjectListCreateView, ProjeDetailsView, UserProjectsView

urlpatterns = [
    path('create/', ProjectListCreateView.as_view(), name='project-create'),
    path('list/', ProjeDetailsView.as_view(), name='project-list'),
     path('user-projects/', UserProjectsView.as_view(), name='user-projects'),
]
