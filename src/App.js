import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import AddAppointment from "./pages/AddAppointment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/add-patient" element={<AddPatient/>}></Route>
          <Route path="/patients" element={<Patients />}></Route>
          <Route path="/add-appointment" element={<AddAppointment/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;