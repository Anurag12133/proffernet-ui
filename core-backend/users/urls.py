from django.urls import path
from .views import SignupView, GithubOAuthView

urlpatterns = [
    path('signup', SignupView.as_view(), name='register'),
     path('api/auth/github/', GithubOAuthView.as_view(), name='github_oauth')
]
