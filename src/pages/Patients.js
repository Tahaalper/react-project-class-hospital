/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { Stack } from "@mui/material";
const Patients = (props) => {
    const navigate = useNavigate()
    const [patients, setPatients] = useState(null)
    const [updateComponent, setUpdateComponent] = useState(false)
    useEffect((props) => {
        axios.get("http://localhost:3004/patients")
            .then(res => {
                setPatients(res.data)
            })
            .catch(err => {
                console.log(err, "err")
            })
    }, [updateComponent])

    const handleDeletePatient = (patient) => {
        axios.delete(`http://localhost:3004/patients/${patient.id}`)
            .then(deletePatientResponse => {
                patient.operationIds.map(operationId => {
                    axios.delete(`http://localhost:3004/patients/${operationId}`)
                        .then(deleteOperationRes => {
                        })
                        .catch(err => console.log("Patients page deleteOperation err", err))
                })
                setUpdateComponent(!updateComponent)
            })
            .catch(err => console.log("Patients page deletePatient err", err))
    }
    if (!patients) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div>
            <h1>Patients page</h1>
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
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{patient.name}</TableCell>
                                        <TableCell>{patient.surname}</TableCell>
                                        <TableCell>{patient.phone}</TableCell>
                                        <TableCell>
                                            <Stack spacing={2} direction="row">
                                                <Button variant="outlined" color="primary">Edit</Button>
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
        </div>
    )
}

export default Patients;