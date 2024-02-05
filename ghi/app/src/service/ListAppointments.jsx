import { useState, useEffect } from "react";

export default function ListAppointments() {
    const [appointments, setAppointments] = useState([])

    const fetchData = async () => {
        const appointmentsUrl = "http://localhost:8080/api/appointments/"
        const response = await fetch(appointmentsUrl)
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments)
        }
        const automobileVOUrl = "http://localhost:8080/api/appointments/"
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="row">
            <div className="offset-1 col-10">
                <div className="shadow p-4 mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>VIN</td>
                                <td>Is VIP?</td>
                                <td>Customer</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Technician</td>
                                <td>Reason</td>
                                <td>Update Status</td>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
