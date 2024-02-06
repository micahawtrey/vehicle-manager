import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateManufacturer() {
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify({name: name}),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(manufacturerUrl, fetchConfig)
        if (response.ok) {
            setName("")
            navigate("/manufacturers")
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit}>
                        <h3>Create a Manufacturer</h3>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" onChange={handleNameChange} value={name} name="name" id="name" placeholder="Manufacturer Name" />
                            <label htmlFor="name">Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
