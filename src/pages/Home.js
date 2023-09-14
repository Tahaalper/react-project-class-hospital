import { useEffect, useState } from 'react';
import axios from "axios";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


const Home = () => {
    const [appointments, setAppointments] = useState(null);
    const [patients, setPatients] = useState(null);

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
            })
    }, []);

    if (!appointments || !patients) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <h1>Main Page</h1>
            <TableContainer style={{ marginTop: "50px" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#aaa" }}>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
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
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default Home;