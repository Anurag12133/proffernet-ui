from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djoser.social.views import ProviderAuthView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


# Helper function to set cookies with updated expiration
def set_auth_cookies(response, access_token=None, refresh_token=None):
    """Utility function to set authentication cookies securely."""
    if access_token:
        response.set_cookie(
            'access',
            access_token,
            max_age=settings.AUTH_COOKIE_MAX_AGE,  # Matches new expiration settings
            path=settings.AUTH_COOKIE_PATH,
            secure=settings.AUTH_COOKIE_SECURE,
            httponly=settings.AUTH_COOKIE_HTTP_ONLY,
            samesite=settings.AUTH_COOKIE_SAMESITE
        )
    if refresh_token:
        response.set_cookie(
            'refresh',
            refresh_token,
            max_age=settings.AUTH_COOKIE_MAX_AGE * 4,  # Refresh token expiration is 4x access token
            path=settings.AUTH_COOKIE_PATH,
            secure=settings.AUTH_COOKIE_SECURE,
            httponly=settings.AUTH_COOKIE_HTTP_ONLY,
            samesite=settings.AUTH_COOKIE_SAMESITE
        )
    return response


class CustomProviderAuthView(ProviderAuthView):
    """Handles authentication via social providers (Google, GitHub, etc.)."""
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 201:
            set_auth_cookies(response, response.data.get('access'), response.data.get('refresh'))
        return response


class CustomTokenObtainPairView(TokenObtainPairView):
    """Handles login via email/password and sets authentication cookies."""
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            set_auth_cookies(response, response.data.get('access'), response.data.get('refresh'))
        return response


class CustomTokenRefreshView(TokenRefreshView):
    """Handles refreshing JWT access tokens using the refresh token from cookies."""
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token:
            request.data['refresh'] = refresh_token  # Inject refresh token from cookies
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            set_auth_cookies(response, response.data.get('access'))  # Refresh only access token
        return response


class CustomTokenVerifyView(TokenVerifyView):
    """Verifies the validity of the access token stored in cookies."""
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')
        if access_token:
            request.data['token'] = access_token
        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    """Logs out the user by deleting authentication cookies."""
    @staticmethod
    def post(request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response
