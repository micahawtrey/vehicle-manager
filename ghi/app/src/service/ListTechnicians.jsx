import { useState, useEffect } from "react"

export default function ListTechnicians() {
    const [technicians, setTechnicians] = useState([])

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
            <div className="offset-2 col-8">
                <div className="shadow p-4 mt-4">
                    <h3>Technicians</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Employee ID</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                            </tr>
                        </thead>
                        <tbody>
                            {technicians.map(technician => {
                                return (
                                    <tr key={technician.id}>
                                        <td>{technician.employee_id}</td>
                                        <td>{technician.first_name}</td>
                                        <td>{technician.last_name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
