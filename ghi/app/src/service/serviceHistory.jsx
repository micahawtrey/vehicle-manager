import { useState, useEffect } from "react"

export default function ServiceHistory() {
    const [searchVIN, setSearchVIN] = useState("")
    const [automobileVOs, setAutomobileVOs] = useState([])
    const [appointments, setAppointments] = useState([])

    const fetchData = async () => {
        const appointmentsUrl = "http://localhost:8080/api/appointments/"
        const responseAppt = await fetch(appointmentsUrl)
        if (responseAppt.ok) {
            const data = await responseAppt.json()
            setAppointments(data.appointments)
        }
        const automobileVOUrl = "http://localhost:8080/api/automobileVOs/"
        const responseVO = await fetch(automobileVOUrl)
        if (responseVO.ok) {
            const data = await responseVO.json()
            setAutomobileVOs(data.AutomobileVOs)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="row">
            <div className="offset-1 col-10">
                <div className="shadow p-4 mt-4">
                    <h3>Service History</h3>
                    <input type="text" className="form-control" name="searchVIN" id="searchVIN" placeholder="Search by VIN..." />
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
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>AHHHH</td>
                                        <td>{appointment.customer}</td>
                                        <td>DATE</td>
                                        <td>TIME</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>UPDATE Status</td>
                                    </tr>
                                )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
