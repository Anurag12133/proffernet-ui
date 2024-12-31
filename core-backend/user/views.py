# app_name/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileView(APIView):
    def post(self, request, *args, **kwargs):
        permission_classes = [AllowAny]
        # Registration logic (you can add user creation logic here)
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
