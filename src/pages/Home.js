import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material';

const Home = () => {
    const { appointmentsState, patientsState } = useSelector(state => state)
    var sortedAppointments = appointmentsState.appointments.sort(function (item1, item2) {
        return new Date(item1.date) - new Date(item2.date);
    })
    const navigate = useNavigate();
    if (
        patientsState.start === true ||
        patientsState.fail === true ||
        appointmentsState.start === true ||
        appointmentsState.fail === true
    ) {
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
                            appointmentsState.appointments.length === 0 && (
                                <TableRow>
                                    <TableCell align="center" colSpan={5}>There are no appointments</TableCell>
                                </TableRow>
                            )
                        }
                        {
                            sortedAppointments.map((appointment) => {
                                const searchedPatient = patientsState.patients.find(patient => patient.id === appointment.patientId)
                                return (
                                    <TableRow
                                        key={appointment.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {new Date(appointment.date).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{searchedPatient?.name}</TableCell>
                                        <TableCell>{searchedPatient?.surname}</TableCell>
                                        <TableCell>{searchedPatient?.phone}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="primary">Edit</Button>
                                            <Button variant="outlined" color="error">Delete</Button>
                                            <Button variant="outlined" color="secondary">Details</Button>
                                        </TableCell>
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