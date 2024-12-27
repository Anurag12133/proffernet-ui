from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import DeveloperSerializer, VerifyOTPSerializer
from .models import User
from .emails import send_otp_via_email
class DeveloperView(APIView):
    def post(self, request):
        try:
            serializer = DeveloperSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                send_otp_via_email(serializer.data['email'])
                return Response({
                    'message': 'Developer created successfully',
                    'status': 200,
                    'data': serializer.data
                })
            return Response({
                'message': 'Developer creation failed',
                'status': 400
            })
               
        except Exception as e:
            return Response({
                'message': str(e),
                'status': 500
            })
        

class VerifyOTP(APIView):
    def post(slef, request):
        try:
            serializer = VerifyOTPSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.data['email']
                otp = serializer.data['otp']
                user_obj = User.objects.filter(email=email)
                if not user_obj.exists() and user_obj[0].otp == otp:
                    return Response({
                        'message': 'User not found',
                        'status': 400
                    })
                
                user = user_obj.first()
                
                user.is_verified = True
                user.save()

                return Response({
                    'message': 'User verified successfully',
                    'status': 200
                })
            return Response({
                'message': 'Invalid OTP',
                'status': 400
            })
          
        except Exception as e:
            return Response({
                'message': str(e),
                'status': 500
            })