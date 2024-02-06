import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateModel() {
    const [manufacturers, setManufacturers] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        manufacturer_id: ""
    })
    const navigate = useNavigate()

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

        const modelUrl = "http://localhost:8100/api/models/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(modelUrl, fetchConfig)
        if (response.ok) {
            setFormData({
                name: "",
                picture_url: "",
                manufacturer_id: ""
            })
            navigate("/models")
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit}>
                        <h3>Create a Model</h3>
                        <div className="form-floating mb-3">
                            <input onChange={handleInputChange} type="text" className="form-control" name="name" id="name" value={formData.name} placeholder="Name" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleInputChange} type="url" className="form-control" name="picture_url" id="picture_url" value={formData.picture_url} placeholder="Picture URL" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleInputChange} value={formData.manufacturer_id} className="form-select" name="manufacturer_id" id="manufacturer_id">
                                <option defaultValue="">--Select a Manufacturer--</option>
                                {manufacturers.map(manufacturer => {
                                    return (<option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>)
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
