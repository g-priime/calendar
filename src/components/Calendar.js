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
import GetAppointments from "./GetAppointments";

class Calendar extends React.Component {
  onPopupOpen(args) {
    console.log("hello");
  }

  //not work
  onEditorClose() {
    console.log("g'bye");
  }

  getAppointmentInfo = () => {
    let gotInfo = false;

    if (gotInfo === false) {
      gotInfo = true;
      console.log("get info");

      let appointments = [];
      appointments = this.getInfo();
      console.log(appointments);
    }
  };

  getInfo = async () => {
    let result = [];
    result = await GetAppointments();
    return result.documents;
  };

  onActionBegin(ActionEventArgs) {
    if (ActionEventArgs.changedRecords !== undefined) {
      console.log(
        ActionEventArgs.data[0].Subject,
        ActionEventArgs.data[0].Id,
        ActionEventArgs.data[0].IsAllDay,
        ActionEventArgs.data[0].StartTime,
        ActionEventArgs.data[0].EndTime
      );

      AddAppointment(ActionEventArgs.data[0]);
    }
  }

  render() {
    this.getAppointmentInfo();

    return (
      <div>
        <ScheduleComponent
          popupOpen={this.onPopupOpen.bind(this)}
          editorClose={this.onEditorClose.bind(this)}
          actionBegin={this.onActionBegin.bind(this)}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
        ;
      </div>
    );
  }
}

export default Calendar;
