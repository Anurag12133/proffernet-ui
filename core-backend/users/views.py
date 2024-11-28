# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import login
import requests
from .serializers import UserSerializer

class GithubOAuthView(APIView):
    def post(self, request):
       
        code = request.data.get('code')
        if not code:
            return Response({"error": "Authorization code is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        token_url = 'https://github.com/login/oauth/access_token'
        client_id = 'Ov23liHT4Mrz0DOyBt4a'
        client_secret = 'd4c675dc084f6ba600f9b65d5e743a34c8acbfb3'
        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
        }
        headers = {'Accept': 'application/json'}
        response = requests.post(token_url, data=data, headers=headers)
        
        if response.status_code != 200:
            return Response({"error": "Failed to retrieve access token"}, status=status.HTTP_400_BAD_REQUEST)
        
        access_token = response.json().get('access_token')
        if not access_token:
            return Response({"error": "Access token not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Step 3: Use the access token to fetch user data from GitHub API
        user_response = requests.get(
            'https://api.github.com/user',
            headers={'Authorization': f'token {access_token}'}
        )
        if user_response.status_code != 200:
            return Response({"error": "Failed to fetch user information"}, status=status.HTTP_400_BAD_REQUEST)
        
        user_data = user_response.json()
        username = user_data.get('login')
        email = user_data.get('email') or f"{username}@github.com"  
        
        user, created = User.objects.get_or_create(username=username, defaults={'email': email})

        if created:
            user.set_password(User.objects.make_random_password())
            user.save()
        
        serializer = UserSerializer(user)  # Use your existing serializer
        return Response({
            "message": "Successfully authenticated with GitHub",
            "user": serializer.data
        }, status=status.HTTP_200_OK)


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Calls the create method in the serializer
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
