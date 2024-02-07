import { useEffect, useState } from "react"

function Automobiles () {
    const [autos, setAutos] = useState([])

    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setAutos(data.autos)
        }
    }
    useEffect(() => {
       fetchAutos()
    }, [])


    return(
        <div className="row">
            <div className="offset-1 col-10">
                <div className="shadow p-4 mt-4">
                    <h1>Automobiles</h1>
                    <table className="table caption-top">
                        <thead>
                        <tr>
                            <th scope="col">VIN</th>
                            <th scope="col">Color</th>
                            <th scope="col">Year</th>
                            <th scope="col">Model</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Sold</th>
                        </tr>
                        </thead>
                        <tbody>
                            {autos.map(auto => {
                                return (
                                    <tr key={auto.id}>
                                        <td>{auto.vin}</td>
                                        <td>{auto.color}</td>
                                        <td>{auto.year}</td>
                                        <td>{auto.model.name}</td>
                                        <td>{auto.model.manufacturer.name}</td>
                                        <td>{auto.sold ? "Yes" : "No"}</td>
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
export default Automobiles
