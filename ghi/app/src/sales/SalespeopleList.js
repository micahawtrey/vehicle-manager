
function SalespeopleList () {
    const [salespeople, setSalespeople] = useState([])


    const handleDelete = async (e) => {
      e.preventDefault();
      const id = e.target.dataset.id
      const url = `http://localhost:8090/api/salespeople/${id}/`
      const fetchConfig = {method: "delete"};
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        const data = await response.json()
        fetchData()
      }
    }

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
                        <td><button onClick={handleDelete} data-id={salesperson.employee_id} className="btn btn-danger">Delete</button></td>
                    </tr>
                )
            })}
    </tbody>
    </table>
    )
}

export default SalespeopleList
