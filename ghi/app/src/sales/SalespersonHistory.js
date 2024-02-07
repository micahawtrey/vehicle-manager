import { useState, useEffect } from "react";

function SalesTable({sales}) {
    if (!sales) {
        return null
    }
    return (
        <div>
        <table className="table caption-top">
        <thead>
            <tr>
            <th scope="col">Salesperson</th>
            <th scope="col">Customer</th>
            <th scope="col">VIN</th>
            <th scope="col">Price</th>
            </tr>
        </thead>
        <tbody>
        {sales.map(sale => {
            return(
                <tr key={sale.id}>
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
    )
}

function NoSales () {
    return (
        <div className="row">
            <div className="offset-4 col-6">
                <div className="card text-center mb-3 mt-3 shadow p-4 mt-4" style={{width: "18rem"}}>
                    <div className="card-body">
                        <b>No Sales</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SalespersonHistory () {
    const [salespeople, setSalespeople] = useState([])
    const [sales, setSales] = useState([])
    const [salesperson, setSalesperson] = useState('')


    const fetchSalespeople = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(salespeopleUrl)
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        }
    }

    const fetchSales = async (person) => {
        if (person) {
        const salesUrl = 'http://localhost:8090/api/sales/'
        const response = await fetch(salesUrl)
        if (response.ok) {
            const data = await response.json()
            const salespersonSales = data.sales.filter((sale) => {
                if (sale.salesperson.employee_id === person) {
                    return sale
                }})
                setSales(salespersonSales)
            }}}

    const onPersonChange = (e) => {
        const value = e.target.value
        setSalesperson(value)
    }

    useEffect(() => {
        fetchSalespeople()
    }, [])

    useEffect(() => {
        fetchSales(salesperson)
    }, [salesperson])


    return(
        <div className="row">
            <div className="offset-1 col-10">
                <div className="shadow p-4 mt-4">
                    <h1>Salesperson History</h1>
                    <select value={salesperson} onChange={onPersonChange} className="form-select">
                        <option value=''>Select Salesperson</option>
                        {salespeople.map(person => {
                            return(
                                <option key={person.employee_id} value={person.employee_id}>{person.first_name} {person.last_name}</option>
                            )
                        })}
                    </select>
                    {sales.length > 0 ? <SalesTable sales={sales}/> : <NoSales />}
                </div>
            </div>
        </div>
    )
}

export default SalespersonHistory
