"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from accounts.views import (
    UserCreateView,
    UserStackCreateView
)
from projects.views import (
    ProjectListView,
    ProjectCreateView,
    ProjectUpdateView,
    ProjectDeleteView
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/create/', UserCreateView.as_view(), name='user_create'),
    path('userstacks/create/', UserStackCreateView.as_view(), name='userstack_create'),
    path('projects/', ProjectListView.as_view(), name='project_list'),
    path('create/', ProjectCreateView.as_view(), name='project-create'),
    path('update/<int:pk>/', ProjectUpdateView.as_view(), name='project-update'),
    path('delete/<int:pk>/', ProjectDeleteView.as_view(), name='project-delete')
]
