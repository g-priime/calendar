import React from 'react'
import { projectFirestore } from "../firebase";

export default function AddAppointment(appointment) {
    const collectionRef = projectFirestore.collection("appointment");

    collectionRef.doc(appointment.Subject).set({
        subject: appointment.Subject,
      });

    return (
        <div>
            
        </div>
    )
}
