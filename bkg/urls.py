from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('references/', views.references, name='references'),
    path('contact/', views.contact, name='contact'),
    path('api/chat/', views.chat_api, name='chat_api'),
]
