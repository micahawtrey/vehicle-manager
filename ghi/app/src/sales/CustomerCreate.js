import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustomerCreate () {
    const [formData, setFormData] = useState({
        first_name:"",
        last_name:"",
        address:"",
        phone_number:"",
    })

    const navigate = useNavigate();

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customerUrl = 'http://localhost:8090/api/customers/';

        const fetchConfig = {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            navigate("/customers/")
        } else {
            alert("Customer couldn't be created")
        }
    }

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input value={formData.first_name} onChange={handleFormChange} placeholder="First Name" maxLength="100" required type="text" name="first_name" id="first_name" className="form-control" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={formData.last_name} onChange={handleFormChange} placeholder="Last Name" maxLength="100" required type="text" name="last_name" id="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={formData.address} onChange={handleFormChange} placeholder="Color" maxLength="100" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input value={formData.phone_number} onChange={handleFormChange} maxLength="200" placeholder="Phone Number" type="text" name="phone_number" id="phone_number" className="form-control" />
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default CustomerCreate
