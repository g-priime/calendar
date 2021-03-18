import { projectFirestore } from "../firebase";

export default function GetAppointments() {
  let documents = [];

  projectFirestore
    .collection("appointment")
    .orderBy("startTime", "desc")
    .onSnapshot((snap) => {
      snap.forEach((doc) => {
        if (true) {
          documents.push({ ...doc.data(), id: doc.id });
        }
      });
    });

  return { documents };
}
