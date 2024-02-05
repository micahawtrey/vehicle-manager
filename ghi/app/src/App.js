import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateAppointment from './service/CreateAppointment';
import CreateTechnician from './service/CreateTechnician';
import ListTechnicians from './service/ListTechnicians';
import ListAppointments from './service/ListAppointments';
import ServiceHistory from './service/ServiceHistory';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
