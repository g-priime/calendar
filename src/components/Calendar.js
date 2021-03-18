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
  constructor() {
    super(...arguments);
    this.data = [
      {
        Id: 2,
        Subject: "Meeting",
        StartTime: new Date(2021, 2, 15, 1, 0),
        EndTime: new Date(2021, 2, 15, 12, 30),
        IsAllDay: false,
        Status: "Completed",
        Priority: "High",
      },
    ];
  }

  getAppointmentInfo = () => {
    let gotInfo = false;

    if (gotInfo === false) {
      gotInfo = true;
      console.log("get info");

      let appointments = [];
      appointments = this.getInfo();
      console.log(appointments);
      console.log(this.data);
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
          actionBegin={this.onActionBegin.bind(this)}
          eventSettings={{
            dataSource: this.data,
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
