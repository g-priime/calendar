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

class Calendar extends React.Component {
  onPopupOpen(args) {
    console.log("hello");
  }

  //not work
  onEditorClose() {
    console.log("g'bye");
  }

  onActionBegin(ActionEventArgs) {
    if (ActionEventArgs.changedRecords !== undefined) {
      console.log(
        ActionEventArgs.data[0].Subject,
        ActionEventArgs.data[0].Id,
        ActionEventArgs.data[0].IsAllDay,
        ActionEventArgs.data[0].StartTime,
        ActionEventArgs.data[0].EndTime
      );
    }
  }

  render() {
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
