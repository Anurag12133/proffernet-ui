from django.urls import path
from .views import (
    CreateSocialDetailsView,
    DeleteSocialDetailsView,
    GetUserSocialDetailsView,
    GetSocialDetailsByProjectView
)

urlpatterns = [
    path('social-details/create/', CreateSocialDetailsView.as_view(), name='create-social-details'),
    path('social-details/delete/', DeleteSocialDetailsView.as_view(), name='delete-social-details'),
    path('social-details/all/', GetUserSocialDetailsView.as_view(), name='get-all-social-details'),  # NEW: Get all social details
    path('social-details/project/', GetSocialDetailsByProjectView.as_view(), name='get-project-social-details'),  # Renamed
]
