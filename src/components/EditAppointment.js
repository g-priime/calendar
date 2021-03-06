import React from "react";
import { projectFirestore } from "../firebase";

export default function EditAppointment(appointment) {
  const collectionRef = projectFirestore.collection("appointment");

  collectionRef
    .doc(appointment.id)
    .update({
      id: appointment.Id.toString(),
      appointmentType: appointment.Subject,
      location: appointment.Location || "not specified",
      startTime: appointment.StartTime,
      endTime: appointment.EndTime,
      isAllDay: false,
      description: appointment.Description || "not specified",
      recurrenceRule: appointment.RecurrenceRule || "FREQ=NEVER",
      eventType: appointment.EventType || "not specified",
    })
    .then(() => {
      console.log("Document successfully updated!");
    });

  return <div></div>;
}
