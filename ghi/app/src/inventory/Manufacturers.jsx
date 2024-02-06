import { useState, useEffect } from "react";

export default function Manufacturers() {
    const [manufacturers, setManufacturers] = useState([])

    const fetchData = async () => {
        const manufacturerUrl = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(manufacturerUrl)
        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h3>Manufacturers</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manufacturers.map(manufacturer => {
                                return (
                                    <tr key={manufacturer.id}>
                                        <td>{manufacturer.name}</td>
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
