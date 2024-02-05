from django.shortcuts import render
from .models import Salesperson, Customer, Sale, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = ['first_name', 'last_name', 'employee_id', 'id']

class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = ['first_name', 'last_name', 'employee_id', 'id']

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ['first_name', 'last_name','address', 'phone_number']

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ['id', 'first_name', 'last_name','address', 'phone_number']

class AutomobileDetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold']

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = ['id', 'price', 'automobile', 'customer', 'salesperson']
    encoders = {
        'automobile': AutomobileDetailEncoder(),
        'customer': CustomerDetailEncoder(),
        'salesperson': SalespersonDetailEncoder(),
    }
class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ['id', 'price', 'automobile', 'customer', 'salesperson']
    encoders = {
        'automobile': AutomobileDetailEncoder(),
        'customer': CustomerDetailEncoder(),
        'salesperson': SalespersonDetailEncoder(),
    }



# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse({'salespeople': salespeople}, encoder=SalespersonListEncoder)
    else: ###POST
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson, encoder=SalespersonDetailEncoder, safe=False)

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_salesperson(request, employee_id):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(employee_id=employee_id)
        return JsonResponse(salesperson, encoder=SalespersonDetailEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(employee_id=employee_id).delete()
        return JsonResponse({"deleted": count > 0})
    else: ###PUT
        content = json.loads(request.body)
        Salesperson.objects.filter(employee_id=employee_id).update(**content)
        salesperson = Salesperson.objects.get(employee_id=employee_id)
        return JsonResponse(salesperson, encoder=SalespersonDetailEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse({'customer': customer}, encoder=CustomerListEncoder)
    else: ###POST
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerDetailEncoder, safe=False)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(customer, encoder=CustomerListEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else: ###PUT
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(customer, encoder=CustomerDetailEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({'sales': sales}, encoder=SaleListEncoder)
    else: ###POST
        content = json.loads(request.body)
        sale = Sale.objects.create(**content)
        return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_sales(request, id):
    if request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else: ###PUT
        content = json.loads(request.body)
        try:
            if 'automobile' in content:
                automobile = AutomobileVO.objects.get(id=content['automobile'])
                content['automobile'] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid Automobile"}, status=400)

        try:
            if 'customer' in content:
                customer = Customer.objects.get(id=content['customer'])
                content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid Customer"}, status=400)

        try:
            if 'salesperson' in content:
                salesperson = Salesperson.objects.get(id=content['customer'])
                content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Invalid Salesperson"}, status=400)

        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)
