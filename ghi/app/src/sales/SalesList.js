import { useState, useEffect } from "react";

function SalesList () {
    const [sales, setSales] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sales/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="row">
            <div className="offset-1 col-10">
                <div className="shadow p-4 mt-4">
                    <h1>Sales</h1>
                    <table className="table caption-top">
                        <thead>
                            <tr>
                            <th scope="col">Salesperson Employee ID</th>
                            <th scope="col">Salesperson Name</th>
                            <th scope="col">Customer</th>
                            <th scope="col">VIN</th>
                            <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(sale => {
                                return (
                                    <tr key={sale.id}>
                                        <td>{sale.salesperson.employee_id}</td>
                                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>{sale.price}</td>
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

export default SalesList
