# CarCar

Team:

* Micah Awtrey - Service
* Tayler Pelham - Sales

## Design

## Service microservice

The Service Microservice allow the management of technicians and service appointments. It has three models with the following properties:

AutomobileVO:
- vin
- sold

Technician:
- first_name
- last_name
- employee_id

Appointment
- date_time
- reason
- status
- vin
- customer
- technician (foreign key to Technician)

### Technician Management:

| Action | Method | URL |
| List Technicians | GET | http://localhost:8080/api/technicians/ |
| Create A Technician | POST | http://localhost:8080/api/technicians/ |
| Delete A Technician | DELETE | http://localhost:8080/api/technicians/:id/ |

JSON body to send data:

Create A Technician (SEND THIS JSON BODY):
```
{
	"first_name": "Tayler",
	"last_name": "Pelham",
	"employee_id": 111133
}
```
The return value of creating a Technician:
```
{
	"new_tech": {
		"id": 3,
		"first_name": "Tayler",
		"last_name": "Pelham",
		"employee_id": 111133
	}
}
```
Getting a list of Technicians return value:
```
{
	"technicians": [
		{
			"id": 2,
			"first_name": "Micah",
			"last_name": "Awtrey",
			"employee_id": "123456"
		},
		{
			"id": 3,
			"first_name": "Tayler",
			"last_name": "Pelham",
			"employee_id": "111133"
		}
	]
}
```


### Appointment Management:

| Action | Method | URL |
| List Appointments | GET | http://localhost:8080/api/appointments/ |
| Create An Appointment | POST | http://localhost:8080/api/appointments/ |
| Delete An Appointment | DELETE | http://localhost:8080/api/appointments/:id/ |
| Set Appointment Status to "canceled" | DELETE | http://localhost:8080/api/appointments/:id/cancel/ |
| Set Appointment Status to "finished" | DELETE | http://localhost:8080/api/appointments/:id/finish/ |

### Service Poller

The **poller** for **Service** polls the database every 60 seconds to ensure that Service has an up to date list of Automobiles. These are stored as **AutomobileVOs**. The **AutomobileVO** stores the VIN of the Automobile for use in retrieving data.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.
