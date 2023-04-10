// Patients.js

import React, {useEffect} from 'react';
import { gql, useQuery } from "@apollo/client";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';

const GET_RECORDS_BY_PATIENTS = gql`

query recordById( $patientId:String!){

    recordsByPatientId( patientId: $patientId) {
        patientId
        nurseId
        date
        bodyTemperature
        bloodPressure
        heartRate
        respiratoryRate
            
    }
}
`;


const PatientRecord = () => {
    let navigate = useNavigate();
    let {patientId} = useParams();
    console.log('this is the patient id:', patientId);
    //const { loading, error, data, refetch } = 
    console.log('this is the patient id:', patientId);
    const { loading, error, data, refetch } = useQuery(GET_RECORDS_BY_PATIENTS,{
        variables:{patientId:patientId}
    });

    useEffect(() => { 
        if(data){
            console.log(data);
        }
    },[data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (

        <div className='App'>
            <h2>Patient Record</h2>
            {data && data.recordsByPatientId.length === 0 ?
                <p>No patients record found</p> :
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient ID</th>
                                <th>Nurse ID</th>
                                <th>Date</th>
                                <th>Body Temperature</th>
                                <th>Blood Pressure</th>
                                <th>Heart Rate</th>
                                <th>Respiratory Rate</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.recordsByPatientId.map((record, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{record.patientId}</td>
                                    <td>{record.nurseId}</td>
                                    <td>{record.date}</td>
                                    <td>{record.bodyTemperature}</td>
                                    <td>{record.bloodPressure}</td>
                                    <td>{record.heartRate}</td>
                                    <td>{record.respiratoryRate}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    );
}

export default PatientRecord;