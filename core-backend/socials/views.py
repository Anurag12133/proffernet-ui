from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from .models import Social
from .serializers import SocialSerializer

class SocialListCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        socials = Social.objects.filter(user=request.user)
        serializer = SocialSerializer(socials, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SocialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Assign the current user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SocialDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            social = Social.objects.get(pk=pk, user=request.user)
            serializer = SocialSerializer(social)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Social.DoesNotExist:
            return Response({"error": "Social profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            social = Social.objects.get(pk=pk, user=request.user)
            serializer = SocialSerializer(social, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Social.DoesNotExist:
            return Response({"error": "Social profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            social = Social.objects.get(pk=pk, user=request.user)
            social.delete()
            return Response({"message": "Social profile deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Social.DoesNotExist:
            return Response({"error": "Social profile not found"}, status=status.HTTP_404_NOT_FOUND)
