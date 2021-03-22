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
import DeleteAppointment from "./DeleteAppointment";

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
          if (this.props.currentUser.email === doc.data().email) {
            if (doc.data().recurrenceRule === "FREQ=NEVER") {
              documents.push({
                ...doc.data(),
                id: doc.id,
                Id: doc.data().id,
                StartTime: new Date(doc.data().startTime.seconds * 1000),
                EndTime: new Date(doc.data().endTime.seconds * 1000),
                Subject: doc.data().appointmentType,
                Location: doc.data().location,
                Description: doc.data().description,
                IsAllDay: doc.data().isAllDay,
              });
            } else if (doc.data().recurrenceException === "none") {
              documents.push({
                ...doc.data(),
                id: doc.id,
                Id: doc.data().id,
                StartTime: new Date(doc.data().startTime.seconds * 1000),
                EndTime: new Date(doc.data().endTime.seconds * 1000),
                Subject: doc.data().appointmentType,
                Location: doc.data().location,
                Description: doc.data().description,
                IsAllDay: doc.data().isAllDay,
                RecurrenceRule: doc.data().recurrenceRule,
              });
            } else {
              documents.push({
                ...doc.data(),
                id: doc.id,
                Id: doc.data().id,
                StartTime: new Date(doc.data().startTime.seconds * 1000),
                EndTime: new Date(doc.data().endTime.seconds * 1000),
                Subject: doc.data().appointmentType,
                Location: doc.data().location,
                Description: doc.data().description,
                IsAllDay: doc.data().isAllDay,
                RecurrenceRule: doc.data().recurrenceRule,
                RecurrenceException: doc.data().recurrenceException,
              });
            }
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
        ActionEventArgs.data[0].RecurrenceException
      );
      AddAppointment(ActionEventArgs.data[0], this.props.currentUser);
      this.getInfo();
      //call getInfo() to ensure appt can be updated right after being added
      //otherwise firebase thinks there's no appt to be updated

      //this.scheduleObj.refreshEvents();
    } else if (
      ActionEventArgs.changedRecords !== undefined &&
      ActionEventArgs.requestType === "eventChange"
    ) {
      console.log(ActionEventArgs.changedRecords[0].RecurrenceID);
      if (
        ActionEventArgs.changedRecords[0].RecurrenceID !== undefined &&
        ActionEventArgs.changedRecords[0].RecurrenceID !== null
      ) {
        ActionEventArgs.changedRecords[0].RecurrenceRule = "FREQ=NEVER";
        AddAppointment(
          ActionEventArgs.changedRecords[0],
          this.props.currentUser
        );
        EditAppointment(ActionEventArgs.changedRecords[0]);
      } else {
        EditAppointment(ActionEventArgs.changedRecords[0]);
      }
    } else if (ActionEventArgs.requestType === "eventRemove") {
      DeleteAppointment(ActionEventArgs.data[0]);
    }
  }

  render() {
    this.getAppointmentInfo();

    return (
      <div>
        {}
        <ScheduleComponent
          //ref={(t) => (this.scheduleObj = t)}
          actionBegin={this.onActionBegin.bind(this)}
          eventSettings={{
            dataSource: this.state.data,
          }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Calendar;
