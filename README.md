# CarCar

Team:

* Micah Awtrey - Service
* Tayler Pelham - Sales

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone https://gitlab.com/taylerpelham/project-beta

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Img](/CarCar_DDD_Diagram_Micah_and_Tayler.png)

## Design

CarCar is comprised of three microservices:

- **Inventory**
- **Service**
- **Sales**

## Team Composition

Micah and Tayler completed two separate microservices; **Service** and **Sales** respectively. Micah implemented **Service** to allow the management of vehicle servicing and technicians. Tayler implemented **Sales** to track sales, customers, and salespeople.

Each team member set up their own **poller** to get data from the **Inventory** service. This ensures that the data each person is working on is independent and avoids compromising data. It also ensures all data is kept up to date and available.

## Accessing Endpoints to Send and View Data: Access through Insomnia or Your Browser

### Manufacturers

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Manufacturers | GET | http://localhost:8100/api/manufacturers/ |
| Create a Manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific Manufacturer | GET | http://localhost:8100/api/manufacturers/:id/ |
| Update a specific Manufacturer | PUT | http://localhost:8100/api/manufacturers/:id/ |
| Delete A Manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/ |

JSON body to send data:

Create or Update A Manufacturer (SEND THIS JSON BODY):
```
{
  "name": "Honda"
}
```
The return value of creating or getting a Manufacturer:
```
{
	"href": "/api/manufacturers/6/",
	"id": 6,
	"name": "Honda"
}
```
Getting a list of Manufacturers return value:
```
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/2/",
			"id": 2,
			"name": "Chrysler"
		},
		{
			"href": "/api/manufacturers/3/",
			"id": 3,
			"name": "Ford"
		}
	]
}
```

### Vehicle Models

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Vehicle Models | GET | http://localhost:8100/api/models/ |
| Create a Vehicle Model | POST | http://localhost:8100/api/models/ |
| Get a specific Vehicle Model | GET | http://localhost:8100/api/models/:id/ |
| Update a specific Vehicle Model | PUT | http://localhost:8100/api/models/:id/ |
| Delete A Vehicle Model | DELETE | http://localhost:8100/api/models/:id/ |

JSON body to send data:

Create or Update A Vehicle Model (SEND THIS JSON BODY):
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```
The return value of creating or getting a Vehicle Model:
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/2/",
		"id": 2,
		"name": "Chrysler"
	}
}
```
Getting a list of Vehicle Models return value:
```
{
	"models": [
		{
			"href": "/api/models/1/",
			"id": 1,
			"name": "Sebring",
			"picture_url": "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2010CHR006b_640_01",
			"manufacturer": {
				"href": "/api/manufacturers/2/",
				"id": 2,
				"name": "Chrysler"
			}
		}
	]
}
```

### Automobile

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Automobile | GET | http://localhost:8100/api/automobiles/ |
| Create a Automobile | POST | http://localhost:8100/api/automobiles/ |
| Get a specific Automobile | GET | http://localhost:8100/api/automobiles/:id/ |
| Update a specific Automobile | PUT | http://localhost:8100/api/automobiles/:id/ |
| Delete A Automobile | DELETE | http://localhost:8100/api/automobiles/:id/ |

JSON body to send data:

Create or Update A Automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
The return value of creating or getting a Automobile:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```
Getting a list of Automobile return value:
```
{
	"autos": [
		{
			"href": "/api/automobiles/1C3CC5FB2AN120174/",
			"id": 1,
			"color": "blue",
			"year": 2012,
			"vin": "1C3CC5FB2AN120174",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "Sebring",
				"picture_url": "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2010CHR006b_640_01",
				"manufacturer": {
					"href": "/api/manufacturers/2/",
					"id": 2,
					"name": "Chrysler"
				}
			},
			"sold": true
		}
	]
}
```

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

**AutomobileVO** is a value object that is acquired the **poller**. It refers back to the automobiles created and stored in the inventory service.

**Service** runs on the following URL and port:
- http://localhost:8080/
- port: 8080

### Technician Management:

| Action | Method | URL |
| ----------- | ----------- | ----------- |
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
| ----------- | ----------- | ----------- |
| List Appointments | GET | http://localhost:8080/api/appointments/ |
| Create An Appointment | POST | http://localhost:8080/api/appointments/ |
| Delete An Appointment | DELETE | http://localhost:8080/api/appointments/:id/ |
| Set Appointment Status to "canceled" | PUT | http://localhost:8080/api/appointments/:id/cancel/ |
| Set Appointment Status to "finished" | PUT | http://localhost:8080/api/appointments/:id/finish/ |
| List AutomobileVOs **(only for testing purposes)** | GET | http://localhost:8080/api/automobobileVOs/ |

JSON body to send data:

Create or update an Appointment (SEND THIS JSON BODY):
```
{
	"date_time": "2024-10-25 12:30",
	"reason": "Rebuild",
	"vin": "1C3CC5FEEEN120174",
	"customer": "Liam",
	"technician": 2
}
```
The return value of creating an Appointment:
```
{
	"new_appointment": {
		"id": 3,
		"date_time": "2024-10-25 12:30",
		"reason": "Rebuild",
		"status": "Scheduled",
		"vin": "1C3CC5FEEEN120174",
		"customer": "Liam",
		"technician": {
			"id": 2,
			"first_name": "Micah",
			"last_name": "Awtrey",
			"employee_id": "123456"
		}
	}
}
```
Getting a list of Appointments return value:
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
Getting a list of AutomobileVOs **(Should only be used in testing)**
```
{
	"AutomobileVOs": [
		{
			"vin": "1C3CC5FB2AN120174",
			"sold": true
		}
	]
}
```

### Service Poller

The **poller** for **Service** polls the database every 60 seconds to ensure that Service has an up to date list of Automobiles. These are stored as **AutomobileVOs**. The **AutomobileVO** stores the VIN of the Automobile for use in retrieving data.


## Sales microservice

The Sales microservice allows the management of salespeople and Sales. It has four models with the following properties:

AutomobileVO:
- vin
- sold

Salesperson:
- first_name
- last_name
- employee_id

Customer:
- first_name
- last_name
- address
- phone_number

Sale:
- price
- automoible (foreign key to AutomobileVO)
- customer (foreign key to Customer)
- salesperson (foreign key to Salesperson)


**AutomobileVO** is a value object that is acquired the **poller**. It refers back to the automobiles created and stored in the inventory service.

**Sales** runs on the following URL and port:
- http://localhost:8090/
- port: 8090


### Salespeople Management:

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Salespeople | GET | http://localhost:8090/api/salespeople/ |
| Show a Salesperson | GET | http://localhost:8090/api/salespeople/:employee_id/ |
| Create A Salesperson | POST | http://localhost:8090/api/salespeople/ |
| Delete A Salesperson | DELETE | http://localhost:8090/api/salespeople/:employee_id/ |

JSON body to send data:

Create A Salesperson (SEND THIS JSON BODY):
```
{
	"first_name": "Micah",
	"last_name": "Awtrey",
	"employee_id": "m_awtrey"
}
```
The return value of creating a Salesperson:
```
{
	"first_name": "Micah",
	"last_name": "Awtrey",
	"employee_id": "m_awtrey",
	"id": 11
}
```
Getting a list of Salespeople return value:
```
{
	"salespeople": [
		{
			"first_name": "Micah",
			"last_name": "Awtrey",
			"employee_id": "m_awtrey",
			"id": 11
		},
		{
			"first_name": "Billy",
			"last_name": "Bob",
			"employee_id": "b_bob",
			"id": 6
		}
	]
}
```


### Customer Management:

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Customers | GET | http://localhost:8090/api/customers/ |
| Show a Customer | GET | http://localhost:8090/api/customers/:id |
| Create An Customer | POST | http://localhost:8090/api/customers/ |
| Delete An Customer | DELETE | http://localhost:8090/api/customers/:id/ |


JSON body to send data:

Create or update a Customer (SEND THIS JSON BODY):
```
{
	"first_name": "Billy",
	"last_name": "Bob",
	"address": "123 Main St Augusta, GA 30905",
	"phone_number": "123-456-7890"
}
```
The return value of creating a Customer:
```
{
	"id": 5,
	"first_name": "Billy",
	"last_name": "Bob",
	"address": "123 Main St Augusta, GA 30905",
	"phone_number": "123-456-7890"
}
```
Getting a list of Customers return value:
```
{
	"customers": [
		{
			"id": 5,
			"first_name": "Billy",
			"last_name": "Bob",
			"address": "123 Main St Augusta, GA 30905",
			"phone_number": "123-456-7890"
		},
		{
			"id": 6,
			"first_name": "Judy",
			"last_name": "Smith",
			"address": "321 S Main St Augusta, GA 30905",
			"phone_number": "098-765-4321"
		}
	]
}
```

### Sale Management:

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Sales | GET | http://localhost:8090/api/sales/ |
| Show a Sale | GET | http://localhost:8090/api/sales/:id |
| Create An Sale | POST | http://localhost:8090/api/sales/ |
| Delete An Sale | DELETE | http://localhost:8090/api/sales/:id/ |


JSON body to send data:
Create or update a Sale (SEND THIS JSON BODY):
```
{
	"price": 10000,
	"automobile": "1C3CC5FB2AN120174",
	"customer": 5,
	"salesperson": "m_awtrey"
}
```
The return value of creating a Sale:
```
{
	"id": 17,
	"price": 10000,
	"automobile": {
		"vin": "1C3CC5FB2AN120174",
		"sold": true
	},
	"customer": {
		"id": 5,
		"first_name": "Billy",
		"last_name": "Bob",
		"address": "123 Main St Augusta, GA 30905",
		"phone_number": "123-456-7890"
	},
	"salesperson": {
		"first_name": "Micah",
		"last_name": "Awtrey",
		"employee_id": "m_awtrey",
		"id": 11
	}
}
```
Getting a list of Customers return value:
```
{
	"sales": [
		{
			"id": 17,
			"price": 10000,
			"automobile": {
				"vin": "1C3CC5FB2AN120174",
				"sold": true
			},
			"customer": {
				"id": 5,
				"first_name": "Billy",
				"last_name": "Bob",
				"address": "123 Main St Augusta, GA 30905",
				"phone_number": "123-456-7890"
			},
			"salesperson": {
				"first_name": "Micah",
				"last_name": "Awtrey",
				"employee_id": "m_awtrey",
				"id": 11
			}
		},
		{
			"id": 18,
			"price": 15000,
			"automobile": {
				"vin": "4D2CC5GR2AN146927",
				"sold": true
			},
			"customer": {
				"id": 6,
				"first_name": "Judy",
				"last_name": "Smith",
				"address": "321 S Main St Augusta, GA 30905",
				"phone_number": "098-765-4321"
			},
			"salesperson": {
				"first_name": "Billy",
				"last_name": "Bob",
				"employee_id": "b_bob",
				"id": 6
			}
		}
	]
}
```
### Sales Poller

The **poller** for **Sales** polls the database every 60 seconds to ensure that Sale has an up to date list of Automobiles. These are stored as **AutomobileVOs**. The **AutomobileVO** stores the VIN of the Automobile for use in retrieving data.
