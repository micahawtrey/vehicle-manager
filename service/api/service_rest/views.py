from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import *
from common.json import ModelEncoder
from django.http import JsonResponse
import json

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
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
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician": TechnicianListEncoder()
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

@require_http_methods(["PUT", "GET", "DELETE"])
def api_technician_details(request, id):
    if request.method == "GET":
        pass
    elif request.method == "PUT":
        pass
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        content["status"] = "Scheduled"
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid Technician ID"}, status=400)
        new_appointment = Appointment.objects.create(**content)
        return JsonResponse(
            {"new_appointment": new_appointment},
            encoder=AppointmentListEncoder
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_appointment_details(request, id):
    if request.method == "GET":
        pass
    elif request.method == "PUT":
        content = json.loads(request.body)
        if content.get("technician"):
            try:
                technician = Technician.objects.get(id=content["technician"])
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse({"message": "Invalid Technician ID"}, status=400)
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentListEncoder
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["PUT"])
def api_appointment_cancel(request, id):
    Appointment.objects.filter(id=id).update(status="Cancelled")
    appointment = Appointment.objects.get(id=id)
    return JsonResponse(
        {"appointment": appointment},
        encoder=AppointmentListEncoder
    )

@require_http_methods(["PUT"])
def api_appointment_finish(request, id):
    Appointment.objects.filter(id=id).update(status="Finished")
    appointment = Appointment.objects.get(id=id)
    return JsonResponse(
        {"appointment": appointment},
        encoder=AppointmentListEncoder
    )

@require_http_methods(["GET"])
def api_list_AutomobileVOs(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
        {"AutomobileVOs": automobiles},
        encoder=AutomobileVOListEncoder
    )
