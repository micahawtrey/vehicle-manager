import { useState, useEffect } from "react"

export default function ServiceHistory() {
    const [automobileVOs, setAutomobileVOs] = useState([])
    const [appointments, setAppointments] = useState([])
    const [search, setSearch] = useState("")

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
            const autos = data.AutomobileVOs.map(auto => {return auto.vin})
            setAutomobileVOs(autos)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = async () => {
        const appointmentsUrl = "http://localhost:8080/api/appointments/"
        const responseAppt = await fetch(appointmentsUrl)
        if (responseAppt.ok) {
            const data = await responseAppt.json()
            Promise.all([data]).then(() => {
                if (search.length > 0) {
                    setAppointments(data.appointments.map(appointment => {
                    if (appointment.vin === search) {
                    return appointment
                }}))} else {
                    setAppointments(data.appointments)
                }
            })
        }
    }

    return (
        <div className="row">
            <div className="offset-1 col-10">
                <div className="shadow p-4 mt-4">
                    <h3>Service History</h3>
                    <div className="input-group">
                        <input onChange={handleSearchChange} type="text" value={search} className="form-control" name="searchVIN" id="searchVIN" placeholder="Search by VIN..." />
                        <button onClick={handleSearch} className="btn btn-secondary">Search</button>
                    </div>

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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => {
                                if (appointment) {
                                  let vip = ""
                                if (automobileVOs.includes(appointment.vin)) {
                                    vip = "YES"
                                } else {
                                    vip = "NO"
                                }
                                const date = appointment.date_time.slice(0, 10)
                                const time = appointment.date_time.slice(11, 16)
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{vip}</td>
                                        <td>{appointment.customer}</td>
                                        <td>{date}</td>
                                        <td>{time}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>{appointment.status}</td>
                                    </tr>
                                )}})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
