# CarCar

Team:

* Micah Awtrey - Service
* Tayler Pelham - Sales

## Design

## Service microservice

The Service Microservice allows technicians to manage service appointments.

### Technician Management:

| Action | Method | URL |
| List Technicians | GET | http://localhost:8080/api/technicians/ |
| Create A Technician | POST | http://localhost:8080/api/technicians/ |
| Delete A Technician | DELETE | http://localhost:8080/api/technicians/:id/ |

JSON body to send data:

Create A Technician (SEND THIS JSON BODY):
```
{
  "name": "The Dark Lord's Closet"
  "section_number": 123,
  "shelf_number": 12
}
```
The return value of creating a Technician:
```
{
	"href": "/api/locations/2/",
	"id": 2,
	"closet_name": "The Dark Lord's Closet",
    "section_number": 123,
    "shelf_number": 12
}
```
Getting a list of Technicians return value:
```
{
  "manufacturers": [
    {
        "href": "/api/locations/2/",
        "id": 2,
        "closet_name": "The Dark Lord's Closet",
        "section_number": 123,
        "shelf_number": 12
    },
    {
        "href": "/api/locations/5/",
        "id": 5,
        "closet_name": "Maddie's Closet",
        "section_number": 12,
        "shelf_number": 36
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
