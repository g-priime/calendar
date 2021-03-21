import React from 'react'
import { projectFirestore } from "../firebase";

export default function DeleteAppointment(appointment) {
    const collectionRef = projectFirestore.collection("appointment");

    collectionRef.doc(appointment.id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    return (
        <div>
            
        </div>
    )
}
