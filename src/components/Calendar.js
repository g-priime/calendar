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
    let result = [];
    result = await GetAppointments();

    this.setState({ data: result });
    console.log(result);
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
