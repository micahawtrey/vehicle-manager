import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


function CreateAutomobile () {
    const [models, setModels] = useState([])
    const [formData, setFormData] = useState({
        color:'',
        year:'',
        vin:'',
        model:''
    })

    const navigate = useNavigate()

    const getModels = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        }
    }

    useEffect(() => {
        getModels()
    }, [])

    const handleFormChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const autoUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method:"post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(autoUrl, fetchConfig)
        if (response.ok) {
            navigate('/automobiles/')
        } else {
            alert('Automobile could not be created.')
        }
    }

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input value={formData.color} onChange={handleFormChange} placeholder="Color" maxLength="100" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input value={formData.year} onChange={handleFormChange} placeholder="Year" maxLength="100" required type="text" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input value={formData.vin} onChange={handleFormChange} placeholder="VIN" maxLength="100" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select value={formData.model} onChange={handleFormChange} required name="model" id="model" className="form-select">
                  <option value=''>Choose a model</option>
                  {models.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    );
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

export default CreateAutomobile
