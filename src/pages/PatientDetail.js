import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApplyTreatmentModal from "../components/ApplyTreatment";

const PatientDetail = (props) => {
    const { patientId } = useParams()
    const [patient, setPatient] = useState(null)
    const [patientOperations, setPatientOperations] = useState([])
    const [openTreatmentModal, setOpenTreatmentModal] = useState(false)
    const [selectedOperation, setSelectedOperation] = useState(null)
    const [didUpdate, setDidUpdate] = useState(false)
    useEffect(() => {
        axios
            .get(`http://localhost:3004/patients/${patientId}`)
            .then((patientRes) => {
                setPatient(patientRes.data)
                axios.get("http://localhost:3004/operations")
                    .then((operationRes) => {
                        const tempPatientOperations = [];
                        for (let i = 0; i < patientRes.data.operationIds.length; i++) {
                            const operation = operationRes.data.find(
                                (item) => item.id === patientRes.data.operationIds[i]
                            );
                            tempPatientOperations.push(operation)
                        }
                        setPatientOperations(tempPatientOperations)
                    })
                    .catch((err) => { console.log("err", err) })
            })
            .catch((err) => { console.log("err", err) })
    }, [didUpdate, patientId])

    return (
        <div>
            <h1>Patient Name: {patient?.name}</h1>
            <h2>Patient Surname: {patient?.surname}</h2>
            <h2>Patient Phone: {patient?.phone}</h2>
            {patientOperations.length === 0 ? (
                <p>Patient has not any operations</p>
            ) : (
                <div>
                    {patientOperations.map((operation) => (
                        <div>
                            <h3>Complaint: {operation.complaint}</h3>
                            <p>
                                {operation.treatment === "" ? (
                                    <>
                                        <span>Patient has not any treatment </span>
                                        <button
                                            onClick={() => {
                                                setOpenTreatmentModal(true)
                                                setSelectedOperation(operation)
                                            }}
                                        >Add Treatment</button>
                                    </>
                                ) : (
                                    <>
                                    <h4>Treatment: </h4>
                                    <span>{operation.treatment}</span>
                                    </>
                                )}
                            </p>
                            <p>
                                {operation.prescription.length === 0 ?
                                    (<span>Patient has not any prescription</span>
                                    ) : (
                                        <>
                                            <h4>Medicines: </h4>
                                            <p>
                                                {
                                                    operation.prescription.map((medicine) => (
                                                        <span>{medicine}</span>
                                                    ))}
                                            </p>
                                        </>
                                    )
                                }
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <ApplyTreatmentModal
                open={openTreatmentModal}
                handleClose={() => { setOpenTreatmentModal(false) }}
                operation={selectedOperation}
                didUpdate={didUpdate}
                setDidUpdate={setDidUpdate}
            />
        </div>
    )
}
export default PatientDetail;
