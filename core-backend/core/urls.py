from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('accounts/', include('allauth.urls')),  # Django-allauth URLs
    path('api/auth/', include('dj_rest_auth.urls')),  # DRF Auth URLs
    path('api/auth/social/', include('dj_rest_auth.registration.urls')),  # Social auth URLs
   
]