import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
const AddAppointment = (props) => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [complaint, setComplaint] = useState("");
    const [hasPatient, setHasPatient] = useState(false);
    const [patients, setPatients] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3004/patients")
            .then(res => {
                setPatients(res.data)
            })
            .catch(err => {
                console.log("AddPatient page, getPatients error", err)
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!date || !phone || !name || !surname || !complaint) {
            alert("All fields must be filled")
            return;
        };

        if (phone.length !== 11) {
            alert("Phone number must be 11 digits")
            return;
        };
        if (hasPatient) {
            const newAppointment = {
                id: String(v4()),
                date: date,
                patientId: hasPatient.id
            };
            const newOperation = {
                id: String(v4()),
                complaint: complaint,
                treatment: "",
                prescription: []
            };
            const updatedPatient = {
                ...hasPatient,
                operationIds: [
                    ...hasPatient.operationIds,
                    newOperation.id
                ]
            };
            console.log(newOperation, updatedPatient, newAppointment)
            axios.post("http://localhost:3004/appointments", newAppointment)
                .then((res) => { console.log("appointmnet register", res) })
                .catch((err) => { console.log("err", err) })
            axios.post("http://localhost:3004/operations", newOperation)
                .then((res) => { console.log("operations register", res) })
                .catch((err) => { console.log(err) })
            axios.put(`http://localhost:3004/patients/${hasPatient.id}`, updatedPatient)
                .then((res) => { console.log("patient update", res) })
                .catch((err) => { console.log(err) })
            navigate("/")
        } else {
            const newOperation = {
                id: String(v4()),
                complaint: complaint,
                treatment: "",
                prescription: []
            };
            const newPatient = {
                id: String(v4()),
                name: name,
                surname: surname,
                phone: phone,
                operationIds: [newOperation.id]
            };
            const newAppointment = {
                id: String(v4()),
                date: date,
                patientId: newPatient.id
            };

            console.log(newOperation, newPatient, newAppointment)
            axios.post("http://localhost:3004/appointments", newAppointment)
                .then((res) => { console.log("appointmnet register", res) })
                .catch((err) => { console.log("err", err) })
            axios.post("http://localhost:3004/patients", newPatient)
                .then((res) => { console.log("Patient register", res) })
                .catch((err) => console.log("err", err))
            axios.post("http://localhost:3004/operations", newOperation)
                .then((res) => { console.log("operation register", res) })
                .catch((err) => { console.log("err", err) })
            navigate("/")
        }
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
        const wantedPatient = patients.find((item) => item.phone === String(event.target.value))
        if (wantedPatient) {
            setName(wantedPatient.name)
            setSurname(wantedPatient.surname)
            setHasPatient(wantedPatient)
        } else {
            setName("")
            setSurname("")
            setHasPatient(false)
        }
    }

    if (!patients) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{ marginTop: "50px" }}
            >
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        type={"number"}
                        style={{ width: "50%" }}
                        label="Phone Number"
                        variant="outlined"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        style={{ width: "50%" }}
                        label="Patient's Name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                        disabled={hasPatient}
                    />

                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        style={{ width: "50%" }}
                        label="Patient's Surname"
                        variant="outlined"
                        value={surname}
                        onChange={(event) => { setSurname(event.target.value) }}
                        disabled={hasPatient}
                    />

                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <TextField
                        style={{ width: "50%" }}
                        label="Patient's Complaint"
                        variant="outlined"
                        value={complaint}
                        onChange={(event) => { setComplaint(event.target.value) }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
                    <input
                        onChange={(event) => {
                            setDate(event.target.value)
                        }}
                        value={date}
                        type={"datetime-local"} />

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

export default AddAppointment;