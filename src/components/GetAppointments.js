import { projectFirestore } from "../firebase";

export default async function GetAppointments() {
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
      //this.setState({ documents });
      return Promise.resolve({ documents });
    });
}
