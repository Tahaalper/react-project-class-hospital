import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import AddAppointment from "./pages/AddAppointment";
import PatientDetail from "./pages/PatientDetail";
import { useEffect } from "react";
import api from "./api/api";
import urls from "./api/urls";
import { useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_PATIENTS_START })
    api.get(urls.patients)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_PATIENTS_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_PATIENTS_FAIL, payload: "An error occured while importing patients!" })
      })
    dispatch({ type: actionTypes.FETCH_APPOINTMENTS_START })
    api.get(urls.appointments)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_APPOINTMENTS_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_APPOINTMENTS_FAIL, payload: "An error occured while importing appointments!" })
      })
    dispatch({ type: actionTypes.FETCH_OPERATIONS_START })
    api.get(urls.operations)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_OPERATIONS_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_OPERATIONS_FAIL, payload: "An error occured while importing operations!" })
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/add-patient" element={<AddPatient />}></Route>
          <Route path="/patients" element={<Patients />}></Route>
          <Route path="/add-appointment" element={<AddAppointment />}></Route>
          <Route path="/patient-detail/:patientId" element={<PatientDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;