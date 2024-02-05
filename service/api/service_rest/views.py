from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import *
from common.json import ModelEncoder
from django.http import JsonResponse
import json

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]

class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician": TechnicianListEncoder
    }



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        new_tech = Technician.objects.create(**content)
        return JsonResponse(
            {"new_tech": new_tech},
            encoder=TechnicianListEncoder
        )
