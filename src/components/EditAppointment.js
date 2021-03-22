import React from "react";
import { projectFirestore } from "../firebase";

export default function EditAppointment(appointment) {
  const collectionRef = projectFirestore.collection("appointment");

  if (
    appointment.RecurrenceID !== undefined &&
    appointment.RecurrenceID !== null
  ) {
    collectionRef
      .doc(appointment.id)
      .update({
        recurrenceException: appointment.RecurrenceException || "none",
      })
      .then(() => {
        console.log("Document successfully updated!");
      });
  } else {
    collectionRef
      .doc(appointment.id)
      .update({
        id: appointment.Id.toString(),
        appointmentType: appointment.Subject,
        location: appointment.Location || "not specified",
        startTime: appointment.StartTime,
        endTime: appointment.EndTime,
        isAllDay: appointment.IsAllDay,
        description: appointment.Description || "not specified",
        recurrenceRule: appointment.RecurrenceRule || "FREQ=NEVER",
      })
      .then(() => {
        console.log("Document successfully updated!");
      });
  }

  return <div></div>;
}
