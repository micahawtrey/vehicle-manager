import { useState, useEffect } from "react";

export default function ListAppointments() {
    const [appointments, setAppointments] = useState([])
    const [automobileVOs, setAutomobileVOs] = useState([])

    const fetchData = async () => {
        const appointmentsUrl = "http://localhost:8080/api/appointments/"
        const response = await fetch(appointmentsUrl)
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments)
        }
        const automobileVOUrl = "http://localhost:8080/api/automobileVOs/"
        const responseVO = await fetch(automobileVOUrl)
        if (responseVO.ok) {
            const data = await responseVO.json()
            const autos = data.AutomobileVOs.map(auto => auto.vin)
            setAutomobileVOs(autos)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleStatusChange = async (id, status) => {
        const statusUrl = `http://localhost:8080/api/appointments/${id}/${status}/`
        const fetchConfig = {
            method: "PUT"
        }
        const response = await fetch(statusUrl, fetchConfig)
        if (response.ok) {
            setAppointments([])
            fetchData()
        }
    }

    return (
        <div className="row">
            <div className="offset-1 col-10">
                <div className="shadow p-4 mt-4">
                    <h3>Service Appointments</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Is VIP?</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Technician</th>
                                <th>Reason</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {appointments.map(appointment => {
                                let vip = ""
                                if (automobileVOs.includes(appointment.vin)) {
                                    vip = "YES"
                                } else {
                                    vip = "NO"
                                }
                                const date = appointment.date_time.slice(0, 10)
                                const time = appointment.date_time.slice(11, 16)
                                if (appointment.status !== "Cancelled" && appointment.status !== "Finished") {return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{vip}</td>
                                        <td>{appointment.customer}</td>
                                        <td>{date}</td>
                                        <td>{time}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>
                                            <button onClick={() => {handleStatusChange(appointment.id, "cancel")}} className="btn btn-danger me-1">Cancel</button>
                                            <button onClick={() => {handleStatusChange(appointment.id, "finish")}} className="btn btn-success">Finish</button>
                                        </td>
                                    </tr>
                                )}})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
