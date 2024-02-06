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
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianListEncoder
            )
        except:
            return JsonResponse({"message": "Request unsuccessful. Please verify formatting."}, status=400)
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            new_tech = Technician.objects.create(**content)
            return JsonResponse(
                {"new_tech": new_tech},
                encoder=TechnicianListEncoder
            )
        except:
            return JsonResponse({"message": "Request unsuccessful. Please verify formatting."}, status=400)

@require_http_methods(["DELETE"])
def api_technician_details(request, id):
    try:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except:
            return JsonResponse({"message": "Request unsuccessful. Please verify formatting."}, status=400)

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentListEncoder
            )
        except:
            return JsonResponse({"message": "Request unsuccessful. Please verify formatting."}, status=400)
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            content["status"] = "Created"
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
        except:
            return JsonResponse({"message": "Request unsuccessful. Please verify formatting."}, status=400)

@require_http_methods(["PUT", "DELETE"])
def api_appointment_details(request, id):
    if request.method == "PUT":
        try:
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
        except:
            return JsonResponse({"message": "Request unsuccessful. Please verify formatting."}, status=400)
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except:
            return JsonResponse({"message": "Request unsuccessful. Please verify formatting."}, status=400)

@require_http_methods(["PUT"])
def api_appointment_cancel(request, id):
    try:
        Appointment.objects.filter(id=id).update(status="Cancelled")
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentListEncoder
        )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Invalid Appointment ID."}, status=400)

@require_http_methods(["PUT"])
def api_appointment_finish(request, id):
    try:
        Appointment.objects.filter(id=id).update(status="Finished")
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentListEncoder
        )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Invalid Appointment ID."}, status=400)

@require_http_methods(["GET"])
def api_list_AutomobileVOs(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
        {"AutomobileVOs": automobiles},
        encoder=AutomobileVOListEncoder
    )
