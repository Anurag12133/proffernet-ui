from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.views import View
from django.http import JsonResponse
from .models import User, UserStack
from .forms import UserForm, UserStackForm

class UserListView(View):
    def get(self, request, pk):
        users = User.objects.all()
        return render (request, 'your_app/user_form.html',{'users' : users})

class UserCreateView(View):
    def get(self, request):
        form = UserForm()
        return render(request, 'your_app/user_form.html', {'form': form})

    def post(self, request):
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('user_detail', pk=user.pk)
        return render(request, 'your_app/user_form.html', {'form': form})
        
class UserStackCreateView(View):
    def get(self, request):
         form = UserStackForm()
         return render(request, 'your_app/userstack_form.html', {'form': form})

    def post(self, request):
        form = UserStackForm(request.POST)
        if form.is_valid():
            stack = form.save()
            return redirect('userstack_list') 
        return render(request, 'your_app/userstack_form.html', {'form': form})