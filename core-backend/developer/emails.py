from django.core.mail import send_mail
from django.conf import settings
import random 
from .models import User

def send_otp_via_email(email):
    try:
        subject = 'Your OTP for verification:'
        otp = random.randint(1000,9999)
        message = f'Your OTP for verification is {otp}'
        email_from = settings.EMAIL_HOST_USER

        print(f"Sending OTP to {email}") 
        send_mail(subject, message, email_from, [email])
        user_obj = User.objects.get(email=email)
        user_obj.otp = otp
        user_obj.save()

        print(f"OTP {otp} saved for {email}")

    except Exception as e:
        print(f"Error sending OTP: {str(e)}")  # Log any error