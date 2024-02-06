import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateAppointment from './service/CreateAppointment';
import CreateTechnician from './service/CreateTechnician';
import ListTechnicians from './service/ListTechnicians';
import ListAppointments from './service/ListAppointments';
import ServiceHistory from './service/serviceHistory';
import CustomerCreate from './sales/CustomerCreate';
import CustomerList from './sales/CustomerList';
import RecordSale from './sales/RecordSale';
import SalesList from './sales/SalesList';
import SalespeopleList from './sales/SalespeopleList';
import SalespeopleCreate from './sales/SalespersonCreate';
import SalespeopleHistory from './sales/SalespersonHistory';
import Manufacturers from './inventory/Manufacturers';
import CreateManufacturer from './inventory/CreateManufacturer';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="manufacturers">
            <Route path="" element={<Manufacturers />}/>
            <Route path="create" element={<CreateManufacturer />} />
          </Route>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route path="" element={<ListTechnicians />} />
            <Route path="create" element={<CreateTechnician />} />
          </Route>
          <Route path="appointments">
            <Route path="" element={<ListAppointments />} />
            <Route path="create" element={<CreateAppointment />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          <Route path="customers">
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
