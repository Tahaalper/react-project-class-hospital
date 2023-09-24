import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
const AddPatient = (props) => {
    const navigate = useNavigate()
    const [patients, setPatients] = useState(null)
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [complaint, setComplaint] = useState("");
    useEffect(() => {
        axios.get("http://localhost:3090/patients")
            .then(res => {
                setPatients(res.data)
            })
            .catch(err => {
                console.log("AddPatient page, getPatients error", err)
            })
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !surname || !phone || !complaint) {
            alert("All blanks have to be fulfilled!")
            return
        };
        if (phone.length !== 11) {
            alert("The phone number is not valid!")
            return
        };
        const hasNumber = patients.find(patient => patient.phone === phone)
        if (hasNumber) {
            alert("This number is already registered")
            return
        };
        const newOperation = {
            id: String(v4()),
            complaint: complaint,
            treatment: "",
            prescription: []
        };
        axios.post("http://localhost:3090/operations", newOperation)
            .then(operationRes => {
                const newPatient = {
                    id: String(v4()),
                    name: name,
                    surname: surname,
                    phone: phone,
                    operationIds: [newOperation.id]
                };
                axios.post("http://localhost:3090/patients", newPatient)
                    .then(res => {
                        navigate("/patients")
                    })
                    .catch(err => {
                        console.log("addPatient page postPatient error", err)
                    })
            })
            .catch(err => {
                console.log("addPatient page postAppointment", err)
            })

    }
    if (!patients) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div>
            <form style={{ marginTop: "50px" }}
                onSubmit={handleSubmit}
            >
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        style={{ width: "50%" }}
                        label="Patient's Name"
                        variant="outlined"
                        value={name}
                        onChange={event => setName(event.target.value)}

                    />

                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        style={{ width: "50%" }}
                        label="Patient's Surname"
                        variant="outlined"
                        value={surname}
                        onChange={event => setSurname(event.target.value)}

                    />

                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        type={"number"}
                        style={{ width: "50%" }}
                        label="Phone Number"
                        variant="outlined"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        style={{ width: "50%" }}
                        label="Patient's Complaint"
                        variant="outlined"
                        value={complaint}
                        onChange={event => setComplaint(event.target.value)}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <Button
                        type='submit'
                        variant='contained'>
                        Kaydet
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddPatient;