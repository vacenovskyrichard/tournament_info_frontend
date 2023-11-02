import { useEffect, useState } from "react";
import "../styles/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/cs";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/sass/styles";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function MyCalendar({
  tournamentsData,
  filterResults,
  setShowData,
  showData,
}) {
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

  // Custom time appearence
  const localizer = momentLocalizer(moment);
  const customFormats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "HH:mm", culture), // Use 'HH:mm' for 24-hour format
    eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, "HH:mm", culture) +
      " - " +
      localizer.format(end, "HH:mm", culture),
  };

  //Custom calendar labels
  const messages = {
    allDay: "Celý den",
    previous: "minulý měsíc",
    next: "další měsíc",
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
        last_update: tournament.last_update,
      };
    });
  }

  // Handle click on specific event
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Generate url for calendar export
  const [calendarUrl, setCalendarUrl] = useState(null);
  const generateCalendarUrl = () => {
    if (filterResults !== undefined) {
      var city = "none";
      if (filterResults.city) {
        city = "";
        filterResults.city.forEach((c) => {
          city += c.label + ";";
        });
        city = city.slice(0, -1);
      }

      var areal = "none";
      if (filterResults.areal) {
        areal = "";
        filterResults.areal.forEach((a) => {
          areal += a.label + ";";
        });
        areal = areal.slice(0, -1);
      }

      var category = "none";
      if (filterResults.category) {
        category = "";
        filterResults.category.forEach((c) => {
          category += c.label + ";";
        });
        category = category.slice(0, -1);
      }

      var level = "none";
      if (filterResults.level) {
        level = "";
        filterResults.level.forEach((l) => {
          level += l.label + ";";
        });
        level = level.slice(0, -1);
      }

      setCalendarUrl(
        `https://jdem-hrat-58da3e527841.herokuapp.com/ical.feed/${city}/${areal}/${category}/${level}/`
      );
      console.log("calendarUrl");
      console.log(calendarUrl);
    } else {
      setCalendarUrl(
        "https://jdem-hrat-58da3e527841.herokuapp.com/ical.feed/none/none/none/none/"
      );
    }
  };

  return (
    <div className="Calendar--main-content">
      <div className="Calendar--content-buttons">
        <button
          className="Calendar--table-button"
          onClick={() => setShowData(true)}
        >
          Tabulka
        </button>
        <button
          className="Calendar--calendar-button"
          onClick={() => setShowData(false)}
        >
          Kalendář
        </button>
      </div>
      <div className="Calendar--calendar-box">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          formats={customFormats}
          messages={messages}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 700,
            fontSize: 20,
            fontFamily: "Babas Neue",
            backgroundColor: "rgb(245, 245, 245)",
          }}
          onSelectEvent={handleEventClick}
        />
      </div>
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
            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Datum:</p>
              <p className="content-text">
                {selectedEvent.date.split("-")[2]}.
                {selectedEvent.date.split("-")[1]}.
                {selectedEvent.date.split("-")[0]}
              </p>
            </div>
            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Areál:</p>
              <p className="content-text"> {selectedEvent.areal}</p>
            </div>
            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Město:</p>
              <p className="content-text"> {selectedEvent.city}</p>
            </div>

            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Kategorie:</p>
              <p className="content-text"> {selectedEvent.category}</p>
            </div>

            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Úroveň:</p>{" "}
              <p className="content-text"> {selectedEvent.level}</p>
            </div>

            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Začátek:</p>
              <p className="content-text"> {selectedEvent.startTime}</p>
            </div>

            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Přihlášeno:</p>
              <p className="content-text">
                {selectedEvent.signed}/{selectedEvent.capacity}
              </p>
            </div>

            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Cena:</p>
              <p className="content-text">{`${selectedEvent.price},- (na osobu)`}</p>
            </div>

            <div className="Calendar--detail-window-textbox">
              <p className="label-text">Organizátor:</p>
              <p className="content-text"> {selectedEvent.organizer}</p>
            </div>

            <div className="Calendar--detail-window-textbox">
              <p className="label-text"> Odkaz:</p>
              <p className="content-text">
                <a href={selectedEvent.link}>{selectedEvent.link}</a>
              </p>
            </div>

            <div className="Calendar--detail-window-last-update">
              <p>Naposledy aktualizováno: {selectedEvent.last_update}</p>
            </div>
          </div>
        )}
      </Modal>
      <div className="Calendar--url-button-box">
        <button onClick={generateCalendarUrl}>Vygenerovat URL</button>
      </div>
      <Modal
        open={calendarUrl !== null}
        onClose={() => setCalendarUrl(null)}
        classNames={{
          modal: "Calendar--detail-window",
        }}
      >
        {calendarUrl && (
          <div>
            <h1>Odkaz na kalendář</h1>
            <p>
              Odkaz: <a href={calendarUrl}>{calendarUrl}</a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
