import { useState } from 'react';
import axios from "axios";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Stack
} from '@mui/material';
import EditPatientModal from '../components/EditPatientModal';
import { useSelector, useDispatch } from "react-redux";
import actionTypes from '../redux/actions/actionTypes';

const Patients = (props) => {
    const { patientsState, appointmentsState } = useSelector(state => state);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [updateComponent, setUpdateComponent] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const handleClose = () => {
        setOpenEditModal(false)
    }
    const handleDeletePatient = (patient) => {
        const filteredAppointments = appointmentsState.appointments.filter(
            item => item.patientId === patient.id)
        axios
            .delete(`http://localhost:3004/patients/${patient.id}`)
            .then((deletePatientResponse) => {
                dispatch({ type: actionTypes.DELETE_PATIENT, payload: patient.id })
                patientsState.patient.operationIds.map((operationId) => {
                    return (
                        axios
                            .delete(`http://localhost:3004/operations/${operationId}`)
                            .then((deleteOperationRes) => {
                                dispatch({ type: actionTypes.DELETE_OPERATION, payload: operationId })
                            })
                            .catch((err) => { console.log("Patients page deleteOperation err", err) })
                    );
                });
                filteredAppointments.map((item) => {
                    return (
                        axios.delete(`http://localhost:3004/appointments/${item.id}`)
                            .then((res) => {
                                dispatch({ type: actionTypes.DELETE_OPERATION, payload: item.id })
                            })
                            .catch((err) => { console.log("err", err) })
                    )
                })
                setUpdateComponent(!updateComponent)
            })
            .catch((err) => { console.log("Patients page deletePatient err", err) })
    }

    if (patientsState.success === false ||
        appointmentsState.success === false
    ) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div>
            <TableContainer style={{ marginTop: "50px" }} component={Paper}>
                <div style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Button
                        onClick={() => navigate("/add-patient")}
                        variant="contained">
                        Add Patient
                    </Button>
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#aaa" }}>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Transactions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            patientsState.patients.length === 0 && (
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>There are no registered patients</TableCell>
                                </TableRow>
                            )
                        }
                        {
                            patientsState.patients.map((patient) => {
                                return (
                                    <TableRow
                                        key={patient.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{patient?.name}</TableCell>
                                        <TableCell>{patient?.surname}</TableCell>
                                        <TableCell>{patient?.phone}</TableCell>
                                        <TableCell>
                                            <Stack spacing={2} direction="row">
                                                <Button onClick={() => {
                                                    setOpenEditModal(true)
                                                    setSelectedPatient(patient)
                                                }}
                                                    variant="outlined"
                                                    color="primary">Edit</Button>
                                                <Button
                                                    onClick={() => handleDeletePatient(patient)}
                                                    variant="outlined"
                                                    color="error">Delete</Button>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => navigate(`/patient-detail/${patient.id}`)}
                                                >Details</Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <EditPatientModal
                patients={patientsState.patients}
                setUpdateComponent={setUpdateComponent}
                updateComponent={updateComponent}
                patient={selectedPatient}
                open={openEditModal}
                handleClose={handleClose}
            />
        </div>
    )
}

export default Patients;