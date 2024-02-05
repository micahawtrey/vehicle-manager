from django.urls import path
from .views import *

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
]
