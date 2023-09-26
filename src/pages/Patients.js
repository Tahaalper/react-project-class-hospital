import { useEffect, useState } from 'react';
import axios from "axios";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Stack
} from '@mui/material';
import EditPatientModal from '../components/EditPatientModal';

const Patients = (props) => {
    const navigate = useNavigate()
    const [patients, setPatients] = useState(null)
    const [updateComponent, setUpdateComponent] = useState(false)
    const [appointments, setAppointments] = useState(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const handleClose = () => {
        setOpenEditModal(false)
    }

    useEffect((props) => {
        axios
            .get("http://localhost:3090/patients")
            .then(res => {
                setPatients(res.data)
            })
            .catch(err => {
                console.log(err, "err")
            })
        axios
            .get("http://localhost:3090/appointments")
            .then(res => {
                setAppointments(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [updateComponent]);


    const handleDeletePatient = (patient) => {
        const filteredAppointments = appointments.filter(
            item => item.patientId === patient.id)
        axios
            .delete(`http://localhost:3090/patients/${patient.id}`)
            .then((deletePatientResponse) => {
                patient.operationIds.map((operationId) => {
                    return (
                        axios
                            .delete(`http://localhost:3090/operations/${operationId}`)
                            .then(deleteOperationRes => {
                            })
                            .catch(err => console.log("Patients page deleteOperation err", err))
                    );
                });
                filteredAppointments.map((item) => {
                    return (
                        axios.delete(`http://localhost:3090/appointments/${item.id}`)
                            .then(res => { })
                            .catch(err => console.log("err", err))
                    )
                })
                setUpdateComponent(!updateComponent)
            })
            .catch(err => console.log("Patients page deletePatient err", err))
    }

    if (!patients || !appointments) {
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
                            patients.length === 0 && (
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>There are no registered patients</TableCell>
                                </TableRow>
                            )
                        }
                        {
                            patients.map(patient => {
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
                                                }} variant="outlined" color="primary">Edit</Button>
                                                <Button onClick={() => handleDeletePatient(patient)} variant="outlined" color="error">Delete</Button>
                                                <Button variant="outlined" color="secondary">Details</Button>
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
                patients={patients}
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