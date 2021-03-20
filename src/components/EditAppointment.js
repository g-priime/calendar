import React from "react";
import { projectFirestore } from "../firebase";

export default function EditAppointment(appointment) {
  const collectionRef = projectFirestore.collection("appointment");

  collectionRef
    .doc(appointment.id)
    .update({
        id: appointment.Id.toString(),
        appointmentType: appointment.Subject,
        startTime: appointment.StartTime,
        endTime: appointment.EndTime,
        isAllDay: appointment.IsAllDay,
    })
    .then(() => {
      console.log("Document successfully updated!");
    });

  return <div></div>;
}
