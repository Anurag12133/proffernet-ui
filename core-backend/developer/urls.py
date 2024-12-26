from django.urls import path, include
from .views import DeveloperView, VerifyOTP

urlpatterns = [
    path('register/', DeveloperView.as_view()),
    path('verify/', VerifyOTP.as_view())
]