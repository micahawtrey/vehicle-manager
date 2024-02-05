
function SalespersonCreate () {
    const [formData, setFormData] = useState({
        first_name:"",
        last_name:"",
        employee_id:"",
    })

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

        const customerUrl = 'http://localhost:8090/api/salespeople/';

        const fetchConfig = {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            //Navigate
        } else {
            alert("Sales Person couldn't be created")
        }
    }

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Customer</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input value={formData.first_name} onChange={handleFormChange} placeholder="First Name" maxLength="100" required type="text" name="first_name" id="first_name" className="form-control" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={formData.last_name} onChange={handleFormChange} placeholder="Last Name" maxLength="100" required type="text" name="last_name" id="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={formData.employee_id} onChange={handleFormChange} placeholder="Employee id" maxLength="100" required type="text" name="employee_id" id="employee_id" className="form-control" />
                <label htmlFor="employee_id">Employee id</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default SalespersonCreate
