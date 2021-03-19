import { projectFirestore } from "../firebase";

export default function GetAppointments() {
  let documents = [];

  projectFirestore
    .collection("appointment")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (true) {
          documents.push({ ...doc.data(), id: doc.id });
        }
      });
      console.log(documents.length);
      return { documents };
    });
}
