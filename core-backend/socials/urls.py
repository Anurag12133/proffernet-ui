from django.urls import path
from .views import SocialListCreateView, SocialDetailView

urlpatterns = [
    path('socials/', SocialListCreateView.as_view(), name='social-list-create'),
    path('social/<int:pk>/', SocialDetailView.as_view(), name='social-detail'),
]
