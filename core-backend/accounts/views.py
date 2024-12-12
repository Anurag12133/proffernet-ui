from django.shortcuts import render
from django.shortcuts import redirect
from django.views import View
from .models import User
from .forms import UserForm, UserStackForm

class UserListView(View):
    @staticmethod
    def get(request, pk):
        users = User.objects.all()
        return render (request, 'your_app/user_form.html',{'users' : users})

class UserCreateView(View):
    @staticmethod
    def get(request):
        form = UserForm()
        return render(request, 'your_app/user_form.html', {'form': form})

    @staticmethod
    def post(request):
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('user_detail', pk=user.pk)
        return render(request, 'your_app/user_form.html', {'form': form})
        
class UserStackCreateView(View):
    @staticmethod
    def get(request):
         form = UserStackForm()
         return render(request, 'your_app/userstack_form.html', {'form': form})

    @staticmethod
    def post(request):
        form = UserStackForm(request.POST)
        if form.is_valid():
            return redirect('userstack_list') 
        return render(request, 'your_app/userstack_form.html', {'form': form})