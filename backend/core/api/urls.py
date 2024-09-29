from django.urls import path, include
from rest_framework.routers import DefaultRouter

from words.api.urls import word_router
from users.api.urls import urlpatterns as users_urlpatterns


router = DefaultRouter()

router.registry.extend(word_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', include(users_urlpatterns)),
]