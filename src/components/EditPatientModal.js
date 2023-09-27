import * as React from 'react';
import { Button, TextField, Modal, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditPatientModal = (props) => {
    const { open, handleClose, patient, patients, updateComponent, setUpdateComponent } = props;
    const [name, setName] = useState(patient?.name);
    const [surname, setSurname] = useState(patient?.surname);
    const [phone, setPhone] = useState(patient?.phone);
    const [hasNameError, setHasNameError] = useState(false);
    const [hasSurnameError, setHasSurnameError] = useState(false);
    const [hasPhoneError, setHasPhoneError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState(false);
    useEffect(() => {
        setName(patient?.name);
        setSurname(patient?.surname);
        setPhone(patient?.phone)
    }, [patient])
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name) {
            setHasNameError(true)
            setTimeout(() => {
                setHasNameError(false)
            }, 3004);
            return;
        }
        if (!surname) {
            setHasSurnameError(true)
            setTimeout(() => {
                setHasSurnameError(false)
            }, 3004);
            return;
        }
        if (!phone) {
            setHasPhoneError(true)
            setPhoneErrorMessage("*Phone number field cannot be blank and must be 11 digits")
            setTimeout(() => {
                setHasPhoneError(false)
                setPhoneErrorMessage("")
            }, 3004);
            return;
        }
        if (phone.length !== 11) {
            setHasPhoneError(true)
            setPhoneErrorMessage("*Phone number must be 11 digits")
            setTimeout(() => {
                setHasPhoneError(false)
                setPhoneErrorMessage("")
            }, 3004);
            return;
        };
        const filteredPatients = patients.filter((item) => item.phone !== patient.phone);
        const hasNumber = filteredPatients.find((patient) => patient.phone === phone);
        if (hasNumber) {
            alert("This number is already registered")
            return;
        };
        const updatedPatient = {
            ...patient,
            name: name,
            surname: surname,
            phone: phone,
        };
        axios
            .put(`http://localhost:3004/patients/${patient.id}`, updatedPatient)
            .then((res) => {
                handleClose()
                setUpdateComponent(!updateComponent)
            })
            .catch((err) => {
                console.log("editPatient component")
            })
    };
       const handleCancel = () =>{
        handleClose()
        setName(patient?.name)
        setSurname(patient?.surname)
        setPhone(patient?.phone)
       }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <h1 style={{ textAlign: "center" }}>AddTreatment</h1>
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "center",
                            margin: "20px 0px"
                        }}>
                            <TextField
                                style={{ width: "100%" }}
                                id='outlined-basic'
                                label="Patient's Name"
                                variant="outlined"
                                value={name}
                                onChange={(event) => {setName(event.target.value)}}
                            />
                            {
                                hasNameError && (
                                    <p>
                                        <small style={{ color: "orangered" }}>*This field cannot be blank</small>
                                    </p>
                                )
                            }
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "20px 0px"
                        }}>
                            <TextField
                                style={{ width: "100%" }}
                                id='outlined-basic'
                                label="Patient's Surname"
                                variant="outlined"
                                value={surname}
                                onChange={(event) =>{ setSurname(event.target.value)}}
                            />
                            {
                                hasSurnameError && (
                                    <p>
                                        <small style={{ color: "orangered" }}>*This field cannot be blank</small>
                                    </p>
                                )
                            }
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "20px 0px"
                        }}>
                            <TextField
                                type="number"
                                style={{ width: "100%"}}
                                id='outlined-basic'
                                label="Patient's Number"
                                variant="outlined"
                                value={phone}
                                onChange={(event) => {setPhone(event.target.value)}}
                            />
                            {
                                hasPhoneError && (
                                    <p>
                                        <small style={{ color: "orangered" }}>{phoneErrorMessage}</small>
                                    </p>
                                )
                            }
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "20px 0px",
                                gap: "20px"
                            }}
                        >
                            <Button
                                onClick={handleCancel}
                                variant="outlined"
                                color='error'>
                                cancel
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                            >
                                save
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default EditPatientModal;