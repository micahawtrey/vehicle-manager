import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateAppointment() {
    const [technicians, setTechnicians] = useState([])
    const [formData, setFormData] = useState({
        vin: "",
        reason: "",
        customer: "",
        technician: "",
        date_time: "",
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const appointmentUrl = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(appointmentUrl, fetchConfig)
        if (response.ok) {
            navigate("/appointments")
            setFormData({
                vin: "",
                reason: "",
                customer: "",
                technician: "",
                date_time: "",
            })

        }
    }

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const fetchData = async () => {
        const technicianUrl = "http://localhost:8080/api/technicians/"
        const response = await fetch(technicianUrl)
        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit}>
                        <h3>Create a Service Appointment</h3>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInputChange} className="form-control" value={formData.vin} name="vin" id="vin" placeholder="Automobile VIN" />
                            <label htmlFor="vin">Automobile VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInputChange} className="form-control" value={formData.customer} name="customer" id="customer" placeholder="Customer" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date_time">Date <span className="text-secondary">(ex. 12/31/2024, 09:30 AM)</span></label>
                            <input type="datetime-local" onChange={handleInputChange} className="form-control" value={formData.date_time} name="date_time" id="date_time"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technician">Technician</label>
                            <select onChange={handleInputChange} value={formData.technician} className="form-select" name="technician" id="technician">
                                <option defaultValue="">--Select a technician--</option>
                                {technicians.map(technician => {
                                    return <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInputChange} className="form-control" value={formData.reason} name="reason" id="reason" placeholder="Reason"/>
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary">Create Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
