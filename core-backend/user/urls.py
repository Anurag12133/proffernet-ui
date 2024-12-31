# app_name/urls.py
from django.urls import path
from .views import UserProfileView

urlpatterns = [
    path('register/', UserProfileView.as_view(), name='user_register'),
]
