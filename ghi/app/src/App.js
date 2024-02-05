import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateAppointment from './service/CreateAppointment';
import CreateTechnician from './service/CreateTechnician';
import ListTechnicians from './service/ListTechnicians';
import ListAppointments from './service/ListAppointments';
import ServiceHistory from './service/ServiceHistory';
import CustomerCreate from './sales/CustomerCreate';
import CustomerList from './sales/CustomerList';
import RecordSale from './sales/RecordSale';
import SalesList from './sales/SalesList';
import SalespeopleList from './sales/SalespeopleList';
import SalespeopleCreate from './sales/SalespeopleCreate';
import SalespeopleHistory from './sales/SalespeopleHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<ListTechnicians />} />
          <Route path="/technicians/create" element={<CreateTechnician />} />
          <Route path="/appointments" element={<ListAppointments />} />
          <Route path="/appointments/create" element={<CreateAppointment />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />
          <Route path="customer">
            <Route path="" element={<CustomerList />}/>
            <Route path="create" element={<CustomerCreate />}/>
          </Route>
          <Route path="salespeople">
            <Route path="" element={<SalespeopleList />}/>
            <Route path="create" element={<SalespeopleCreate />}/>
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />}/>
            <Route path="create" element={<RecordSale />}/>
            <Route path="history" element={<SalespeopleHistory />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
