import * as React from "react";
import "../styles/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function MyCalendar(props) {
  const localizer = momentLocalizer(moment);
  //   const [pickedDate, setPickedDate] = React.useState("2023-10-16");

  const myEventsList = [
    {
      title: "Test Event",
      start: new Date(2023, 9, 15, 10, 0),
      end: new Date(2023, 9, 15, 12, 0),
    },
  ];
  return (
    <div className="Calendar--main-content">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
