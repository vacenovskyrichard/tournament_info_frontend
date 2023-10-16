import { useState } from "react";
import "../styles/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/cs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function MyCalendar({ tournamentsData }) {
  // Define custom month names in Czech
  const customMonthNames = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ];

  // Use the Czech locale and custom month names
  moment.updateLocale("cs", {
    months: customMonthNames,
  });

  const localizer = momentLocalizer(moment);
  const customFormats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "HH:mm", culture), // Use 'HH:mm' for 24-hour format
    eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, "HH:mm", culture) +
      " - " +
      localizer.format(end, "HH:mm", culture),
  };
  const messages = {
    allDay: "Celý den",
    previous: "<",
    next: ">",
    today: "Dnes",
    month: "Měsíc",
    week: "Týden",
    day: "Den",
    agenda: "Agenda",
    date: "Datum",
    time: "Čas",
    event: "Událost",
  };
  var myEventsList = [];
  if (tournamentsData) {
    myEventsList = tournamentsData.map((tournament) => {
      const [year, month, day] = tournament.date.split("-").map(Number);
      const [hour, minute] = tournament.start.split(":").map(Number);

      const startDate = new Date(year, month - 1, day, hour, minute); // Subtract 1 from the month since months are 0-based
      const endHour = hour < 11 ? hour + 8 : hour + 4;
      const endDate = new Date(year, month - 1, day, endHour, minute); // Subtract 1 from the month since months are 0-based
      return {
        title: tournament.name,
        areal: tournament.areal,
        city: tournament.city,
        start: startDate,
        end: endDate,
        startTime: tournament.start,
        category: tournament.category,
        level: tournament.level,
        capacity: tournament.capacity,
        signed: tournament.signed,
        organizer: tournament.organizer,
        price: tournament.price,
        link: tournament.link,
        date: tournament.date,
      };
    });
  }

  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="Calendar--main-content">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        formats={customFormats}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
      <Modal
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        classNames={{
          modal: "Calendar--detail-window",
        }}
      >
        {selectedEvent && (
          <div>
            <h1>{selectedEvent.title}</h1>
            <p>
              Datum: {selectedEvent.date.split("-")[2]}.
              {selectedEvent.date.split("-")[1]}.
              {selectedEvent.date.split("-")[0]}
            </p>
            <p>Areál: {selectedEvent.areal}</p>
            <p>Město: {selectedEvent.city}</p>
            <p>Kategorie: {selectedEvent.category}</p>
            <p>Úroveň: {selectedEvent.level}</p>
            <p>Začátek: {selectedEvent.startTime}</p>
            <p>
              Přihlášeno: {selectedEvent.signed}/{selectedEvent.capacity}
            </p>
            <p>{`Cena: ${selectedEvent.price},-`}</p>
            <p>Organizátor: {selectedEvent.organizer}</p>
            <p>
              Odkaz: <a href={selectedEvent.link}>{selectedEvent.link}</a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
