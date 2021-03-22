import React from "react";
import { projectFirestore } from "../firebase";


export default function AddAppointment(appointment, currentUser) {
  const collectionRef = projectFirestore.collection("appointment");
  

  collectionRef.doc(appointment.Id.toString()).set({
    id: appointment.Id.toString(),
    appointmentType: appointment.Subject,
    location: appointment.Location || "not specified",
    startTime: appointment.StartTime,
    endTime: appointment.EndTime,
    isAllDay: appointment.IsAllDay,
    description: appointment.Description || "not specified",
    recurrenceRule: appointment.RecurrenceRule || "FREQ=NEVER",

    email: currentUser.email,
    displayName: currentUser.displayName,
  });

  return <div></div>;
}
