from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WordViewSet

word_router = DefaultRouter()
word_router.register(r'words', WordViewSet)