from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('djoser.urls')),
    path('api/', include('users.urls')),

    path('app/', include('social_contacts.urls')),
    path('project/',include('projects.urls') ),
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
