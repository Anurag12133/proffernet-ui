
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView,DeleteView
from .models import Project
from .forms import ProjectForm

class ProjectListView(ListView):
    model = Project
    template_name = 'projects/project_list.html'
    context_object_name = 'projects'
    
class ProjectCreateView(CreateView):
    model = Project
    form_class= ProjectForm
    template_name = 'projects/project_form.html'
    success_url = reverse_lazy('project_list')


    def form_valid(self, valid):
        valid.instance.uploaded_by = self.request.user
        return super().form_valid(valid)

class ProjectUpdateView(DetailView):
    model = Project
    template_name = 'projects/project_form.html'
    context_object_name = 'project'
    success_url = reverse_lazy('project_list')

class ProjectDeleteView(DeleteView):
    model = Project
    template_name = 'projects/project_delete.html'
    success_url = reverse_lazy('project_list')
# Create your views here.
