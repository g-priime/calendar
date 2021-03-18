import React from "react";
import { projectFirestore } from "../firebase";

export default function AddAppointment(appointment) {
  const collectionRef = projectFirestore.collection("appointment");

  collectionRef.doc(appointment.Subject).set({
    id: appointment.Id.toString(),
    appointmentType: appointment.Subject,
    startTime: appointment.StartTime,
    endTime: appointment.EndTime,
  });

  return <div></div>;
}
