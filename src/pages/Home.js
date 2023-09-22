import { useEffect, useState } from 'react';
import axios from "axios";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material';

const Home = () => {
    const [appointments, setAppointments] = useState(null);
    const [patients, setPatients] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3004/appointments")
            .then(resAppointments => {
                setAppointments(resAppointments.data)
                axios.get("http://localhost:3004/patients")
                    .then(resPatients => {
                        setPatients(resPatients.data)
                    })
                    .catch(err => { console.log(err, "err") })
            }
            )
            .catch(err => {
                console.log(err, "err")
            }
            )
    }, []);
    if (!appointments || !patients) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <TableContainer style={{ marginTop: "50px" }} component={Paper}>
                <div
                    style={{
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        onClick={() => navigate("/add-appointment")}
                        variant='contained'
                    >
                        Add appointment
                    </Button>
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#aaa" }}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            appointments.length === 0 && (
                                <TableRow>
                                    <TableCell align="center" colSpan={5}>There are no appointments</TableCell>
                                </TableRow>
                            )
                        }
                        {
                            appointments.map((appointment) => {
                                const searchedPatient = patients.find(patient => patient.id === appointment.patientId)
                                return (
                                    <TableRow
                                        key={appointment.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {appointment.date}
                                        </TableCell>
                                        <TableCell>{searchedPatient.name}</TableCell>
                                        <TableCell>{searchedPatient.surname}</TableCell>
                                        <TableCell>{searchedPatient.phone}</TableCell>
                                        <TableCell>butonlar gelecek</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default Home;