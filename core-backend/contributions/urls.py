from django.urls import path
from .views import ContributionCreateView, UserContributionsListView

urlpatterns = [
    path('create/', ContributionCreateView.as_view(), name='contribution-create'),
    path('user/', UserContributionsListView.as_view(), name='user-contributions-list'),
]