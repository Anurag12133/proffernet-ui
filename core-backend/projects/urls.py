from django.urls import path, include
from .views import ProjectListCreateView, ProjectDetailsView, UserProjectsView, ProjectDetailsByTitleView

urlpatterns = [
    path('create/', ProjectListCreateView.as_view(), name='project-create'),
    path('list/', ProjectDetailsView.as_view(), name='project-list'),
    path('user-projects/', UserProjectsView.as_view(), name='user-projects'),
    path('<str:title>/', ProjectDetailsByTitleView.as_view(), name='project-detail-by-title'),
    path('contributions/', include('contributions.urls')),
]
