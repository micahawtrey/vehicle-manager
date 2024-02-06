import { useState, useEffect } from "react";

function CustomerList () {
    const [customers, setCustomers] = useState([])


    const handleDelete = async (e) => {
      e.preventDefault();
      const id = e.target.dataset.id
      const url = `http://localhost:8090/api/customers/${id}/`
      const fetchConfig = {method: "delete"};
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        const data = await response.json()
        fetchData()
      }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setCustomers(data.customers);
        }
      }
      useEffect(() => {
        fetchData();
      }, []);

    return (
  <table className="table caption-top">
  <caption><h1>Customer List</h1></caption>
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody>
        {customers.map(customer => {
            return (
                <tr key={customer.id}>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.phone_number}</td>
                    <td>{customer.address}</td>
                    <td><button onClick={handleDelete} data-id={customer.id} className="btn btn-danger">Delete</button></td>
                </tr>
            )
        })}
  </tbody>
</table>
    )
}

export default CustomerList
