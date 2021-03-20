import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import AddAppointment from "./AddAppointment";
import { projectFirestore } from "../firebase";
import EditAppointment from "./EditAppointment";

class Calendar extends React.Component {
  constructor() {
    super(...arguments);
    this.data = [];
    this.gotInfo = false;
  }

  state = { data: [] };

  getAppointmentInfo = () => {
    if (this.gotInfo === false) {
      this.gotInfo = true;
      console.log("get info");

      this.getInfo();
    }
  };

  getInfo = async () => {
    let documents = [];

    projectFirestore
      .collection("appointment")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (true) {
            documents.push({
              ...doc.data(),
              id: doc.id,
              Id: doc.data().id,
              StartTime: new Date(doc.data().startTime.seconds * 1000),
              EndTime: new Date(doc.data().endTime.seconds * 1000),
              Subject: doc.data().appointmentType,
            });
          }
        });
        console.log(documents.length);
        this.setState({ data: documents });
        console.log(this.state.data);
        //return Promise.resolve({ documents });
      });
    //this.data = await GetAppointments();

    //this.setState({ data: await GetAppointments() });
  };

  onActionBegin(ActionEventArgs) {
    if (
      ActionEventArgs.changedRecords !== undefined &&
      ActionEventArgs.requestType === "eventCreate"
    ) {
      console.log(
        ActionEventArgs.data[0].Subject,
        ActionEventArgs.data[0].Id,
        ActionEventArgs.data[0].IsAllDay,
        ActionEventArgs.data[0].StartTime,
        ActionEventArgs.data[0].EndTime
      );
      AddAppointment(ActionEventArgs.data[0]);
    } else if (
      ActionEventArgs.changedRecords !== undefined &&
      ActionEventArgs.requestType === "eventChange"
    ) {
      console.log(ActionEventArgs.changedRecords[0])
      EditAppointment(ActionEventArgs.changedRecords[0]);
    }
  }

  render() {
    this.getAppointmentInfo();

    return (
      <div>
        <ScheduleComponent
          actionBegin={this.onActionBegin.bind(this)}
          eventSettings={{
            dataSource: this.state.data,
          }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
        ;
      </div>
    );
  }
}

export default Calendar;
