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

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

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
        ActionEventArgs.data[0].Subject,
        ActionEventArgs.data[0].Id,
        ActionEventArgs.data[0].IsAllDay,
        ActionEventArgs.data[0].StartTime,
        ActionEventArgs.data[0].EndTime,
        ActionEventArgs.data[0].Location,
        ActionEventArgs.data[0].Description,
        ActionEventArgs.data[0].RecurrenceID,
        ActionEventArgs.data[0].RecurrenceRule,
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
      console.log(ActionEventArgs.changedRecords[0]);
      EditAppointment(ActionEventArgs.changedRecords[0]);
    } else if (ActionEventArgs.requestType === "eventRemove") {
      DeleteAppointment(ActionEventArgs.data[0]);
    }
  }

  editorTemplate(props) {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            <td colSpan={4}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Status</td>
            <td colSpan={4}>
              <DropDownListComponent
                id="EventType"
                placeholder="Choose status"
                data-name="EventType"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={["New", "Requested", "Confirmed"]}
                value={props.EventType || null}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Reason</td>
            <td colSpan={4}>
              <textarea
                id="Description"
                className="e-field e-input"
                name="Description"
                rows={3}
                cols={50}
                style={{
                  width: "100%",
                  height: "60px !important",
                  resize: "vertical",
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
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
          editorTemplate={this.editorTemplate.bind(this)}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Calendar;
