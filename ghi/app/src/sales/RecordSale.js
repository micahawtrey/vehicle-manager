import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecordSale () {
    const [automobiles, setAutomobiles] = useState([])
    const [salepeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])
    const [formData, setFormData] = useState({
        automobile:'',
        salesperson:'',
        customer:'',
        price:''
    })

    const fetchAutomobiles = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            const unsoldAutos = data.autos.filter(auto => {
                if (!auto.sold) {
                    return auto
                }
            })
            setAutomobiles(unsoldAutos)
        }
    }

    const fetchCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        }
    }

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        }
    }

    useEffect(() =>{
        fetchAutomobiles()
        fetchCustomers()
        fetchSalespeople()
    }, [])

    const handleFromChange = (e) => {
        const value = e.target.value
        const input = e.target.name
        setFormData({
            ...formData,
            [input]:value
        })
    }
    const nagivate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const salesUrl = 'http://localhost:8090/api/sales/'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch(salesUrl, fetchConfig)
        if (response.ok){
            //Set Vechile to Sold
            const saleData = await response.json()
            const autoUrl = `http://localhost:8100/api/automobiles/${saleData.automobile.vin}/`
            const autoFetchConfig = {
                method: 'put',
                body: JSON.stringify({'sold': true}),
                headers: {
                    "Content-type": "application/json"
                }
            }
            const autoResponse = await fetch(autoUrl, autoFetchConfig)
            if (autoResponse.ok) {
                nagivate('/sales/')
            }
        }
    }

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
                <div className="mb-3">
                    <label htmlFor="automobile" className="form-label">Automobile VIN</label>
                    <select onChange={handleFromChange} value={formData.automobile} required name="automobile" id="automobile" className="form-select">
                    <option value=''>Choose an automobile VIN</option>
                    {automobiles.map(auto => {
                        return (
                            <option key={auto.id} value={auto.vin}>{auto.vin}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="salesperson" className="form-label">Salesperson</label>
                    <select onChange={handleFromChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                    <option value=''>Choose a salesperson</option>
                    {salepeople.map(person => {
                        return (
                            <option key={person.employee_id} value={person.employee_id}>{person.first_name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="customer" className="form-label">Customer</label>
                    <select onChange={handleFromChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                    <option value=''>Choose a customer</option>
                    {customers.map(customer => {
                        return (
                            <option key={customer.id} value={customer.id}>{customer.first_name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input value={formData.price} onChange={handleFromChange} required type="number" className="form-control" id="price" name="price" />
                </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default RecordSale
