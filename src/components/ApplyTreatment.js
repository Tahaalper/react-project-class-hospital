import * as React from 'react';
import { Button, TextField, Modal, Box } from '@mui/material';
import { useState } from 'react';
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

const ApplyTreatmentModal = (props) => {
    const { open, handleClose, operation, didUpdate, setDidUpdate } = props;
    const [appliedTreatment, setAppliedTreatment] = useState("")
    const [medicines, setMedicines] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!appliedTreatment || !medicines) {
            alert("All fields must be full")
            return;
        }
        const seperatedMedicines = medicines.split(",")

        const updatedOperation = {
            ...operation,
            treatment: appliedTreatment,
            prescription: seperatedMedicines,
        }
        axios
            .put(`http://localhost:3004/operations/${operation.id}`, updatedOperation)
            .then((res) => {
                setAppliedTreatment("")
                setMedicines("")
                handleClose()
                setDidUpdate(!didUpdate)
            })
            .catch((err) => { console.log(err) })
    };
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
                        <h1 style={{ textAlign: "center" }}>Add Treatment</h1>
                        <div style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "center",
                            margin: "20px 0px"
                        }}>
                            <TextField
                                style={{ width: "100%" }}
                                id='outlined-basic'
                                label="Applied Treatment"
                                variant="outlined"
                                value={appliedTreatment}
                                onChange={(event) => { setAppliedTreatment(event.target.value) }}
                            />

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
                                label="Add Medicine"
                                variant="outlined"
                                value={medicines}
                                onChange={(event) => { setMedicines(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span style={{ color: "orangered", display: "flex", marginLeft: "30px" }}>*Make sure to put a comma between the each medicine.</span>
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
                            onClick={handleClose}
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

export default ApplyTreatmentModal;