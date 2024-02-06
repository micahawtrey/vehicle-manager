import { useState, useEffect } from "react";

function SalespeopleList () {
    const [salespeople, setSalespeople] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setSalespeople(data.salespeople);
        }
      }
      useEffect(() => {
        fetchData();
      }, []);

    return (
    <table className="table caption-top">
    <caption><h1>Salespeople</h1></caption>
    <thead>
        <tr>
        <th scope="col">Employee ID</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        </tr>
    </thead>
    <tbody>
            {salespeople.map(salesperson => {
                return (
                    <tr key={salesperson.employee_id}>
                        <td>{salesperson.employee_id}</td>
                        <td>{salesperson.first_name}</td>
                        <td>{salesperson.last_name}</td>
                    </tr>
                )
            })}
    </tbody>
    </table>
    )
}

export default SalespeopleList
