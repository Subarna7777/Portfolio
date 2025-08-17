from django.urls import path
from .views import ContactView

urlpatterns = [
    path('api/contact/', ContactView.as_view(), name='contact'),
]