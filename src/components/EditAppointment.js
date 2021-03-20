import React from "react";
import { projectFirestore } from "../firebase";

export default function EditAppointment() {
  const collectionRef = projectFirestore.collection("appointment");

  collectionRef
    .doc("7YzvYOx8MUc2fMH9NS8i")
    .update({
      appointmentType: "Another appointment"
    })
    .then(() => {
      console.log("Document successfully updated!");
    });

  return <div></div>;
}
