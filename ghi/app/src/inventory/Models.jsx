import { useState, useEffect } from "react";

export default function Models() {
    const [models, setModels] = useState([])

    const fetchData = async () => {
        const modelsUrl = "http://localhost:8100/api/models/"
        const response = await fetch(modelsUrl)
        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        }
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
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map(model => {
                                return (
                                    <tr>
                                        <td>{model.name}</td>
                                        <td>{model.manufacturer.name}</td>
                                        <td><img src={model.picture_url} style={{width: "300px"}}/></td>
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
