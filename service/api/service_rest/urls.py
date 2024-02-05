from django.urls import path
from .views import *

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:id>/", api_technician_details, name="api_technician_details"),
    path("appointments/<int:id>/", api_appointment_details, name="api_appointment_details"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/cancel/", api_appointment_cancel, name="api_appointment_cancel"),
    path("appointments/<int:id>/finish/", api_appointment_finish, name="api_appointment_finish")
]
