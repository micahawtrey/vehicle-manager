import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTechnician() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        employee_id: ""
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const technicianUrl = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(technicianUrl, fetchConfig)
        if (response.ok) {
            navigate("/technicians")
            setFormData({
                first_name: "",
                last_name: "",
                employee_id: ""
            })
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit}>
                        <h3>Create a Technician</h3>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInputChange} className="form-control" value={formData.first_name} name="first_name" id="first_name" placeholder="First Name" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInputChange} className="form-control" value={formData.last_name} name="last_name" id="last_name" placeholder="Last Name" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInputChange} className="form-control" value={formData.employee_id} name="employee_id" id="employee_id" placeholder="Employee ID"/>
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create Employee</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
