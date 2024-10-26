# your_app/forms.py

from django import forms
from .models import User, UserStack

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'phone', 'address', 'user_type']
        
        widgets = {
            'password': forms.PasswordInput(),  # Use a password input for the password field
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email is already in use.")
        return email

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) < 8:
            raise forms.ValidationError("Password must be at least 8 characters long.")
        return password
    
class UserStackForm(forms.ModelForm):
    class Meta:
        model = UserStack
        fields = ['user', 'stack_name', 'stack_description']

    def clean_stack_name(self):
        stack_name = self.cleaned_data.get('stack_name')
        if not stack_name:
            raise forms.ValidationError("Stack name cannot be empty.")
        return stack_name
