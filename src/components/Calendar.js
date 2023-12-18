import { useEffect, useState } from "react";
import "../styles/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/cs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useRecoilValue } from "recoil";
import { sortedTorunamentsState } from "../state/selectors/SortedTournaments";
import { screenSize } from "../state/atoms/ScreenSize";

export default function MyCalendar({ filterResults }) {
  const tournaments = useRecoilValue(sortedTorunamentsState);
  const screenType = useRecoilValue(screenSize);
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

  const myEventsList = tournaments
    ? tournaments.map((tournament) => {
        // set estimated duration of tournament
        const [year, month, day] = tournament.date.split("-").map(Number);
        const [hour, minute] = tournament.start.split(":").map(Number);
        const startDate = new Date(year, month - 1, day, hour, minute);
        const endHour = hour < 11 ? hour + 8 : hour + 4;
        const endDate = new Date(year, month - 1, day, endHour, minute);
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
      })
    : [];

  // Handle click on specific event
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Generate url for calendar export
  const [showCalendarUrl, setShowCalendarUrl] = useState(false);
  const [calendarUrl, setCalendarUrl] = useState(
    "https://jdem-hrat-58da3e527841.herokuapp.com/ical.feed"
  );

  const generateCalendarUrl = () => {
    const city =
      filterResults && filterResults.city
        ? filterResults.city.map((c) => c.label).join(";")
        : "";
    const areal =
      filterResults && filterResults.areal
        ? filterResults.areal.map((c) => c.label).join(";")
        : "";
    const category =
      filterResults && filterResults.category
        ? filterResults.category.map((c) => c.label).join(";")
        : "";
    const level =
      filterResults && filterResults.level
        ? filterResults.level.map((c) => c.label).join(";")
        : "";

    setCalendarUrl(
      `https://jdem-hrat-58da3e527841.herokuapp.com/ical.feed?city=${city}&areal=${areal}&category=${category}&level=${level}`
    );
    setShowCalendarUrl(true);
  };
  const generateLink = (url) => {
    // Check if the URL already contains a protocol
    const hasProtocol = /^https?:\/\//.test(url);

    // If no protocol, assume http
    const fullUrl = hasProtocol ? url : `http://${url}`;

    return (
      <a href={fullUrl} target="_blank" rel="noreferrer">
        link
      </a>
    );
  };

  return (
    <div className="Calendar">
      <div
        className={
          screenType === "mobile"
            ? "Calendar--calendar-box-mobile"
            : "Calendar--calendar-box"
        }
      >
        <Calendar
          localizer={localizer}
          events={myEventsList}
          formats={customFormats}
          messages={messages}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventClick}
        />
      </div>
      <Modal
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        classNames={{
          modal:
            screenType === "mobile"
              ? "Calendar--detail-window-mobile"
              : "Calendar--detail-window",
        }}
      >
        {selectedEvent && (
          <div>
            <h1>{selectedEvent.title}</h1>
            <div
              className={
                screenType === "mobile"
                  ? "Calendar--detail-window-textbox-mobile"
                  : "Calendar--detail-window-textbox"
              }
            >
              <div
                className={
                  screenType === "mobile"
                    ? "Calendar--detail-window-body-mobile"
                    : "Calendar--detail-window-body"
                }
              >
                <div className="Calendar--detail-window-body-labels">
                  <p>Datum:</p>
                  <p>Areál:</p>
                  <p>Město:</p>
                  <p>Kategorie:</p>
                  <p>Úroveň:</p>
                  <p>Začátek:</p>
                  <p>Týmy:</p>
                  <p>Cena:</p>
                  <p>Pořádá:</p>
                  <p>Odkaz:</p>
                </div>
                <div className="Calendar--detail-window-body-data">
                  <p>
                    {selectedEvent.date.split("-")[2]}.
                    {selectedEvent.date.split("-")[1]}.
                    {selectedEvent.date.split("-")[0]}
                  </p>
                  <p>{selectedEvent.areal}</p>
                  <p>{selectedEvent.city}</p>
                  <p>{selectedEvent.category}</p>
                  <p>{selectedEvent.level}</p>
                  <p>{selectedEvent.startTime}</p>
                  <p>
                    {selectedEvent.signed}/{selectedEvent.capacity}
                  </p>
                  <p>{selectedEvent.price},- (za osobu)</p>
                  <p>{selectedEvent.organizer}</p>
                  {generateLink(selectedEvent.link)}
                </div>
              </div>
            </div>
            <div
              className={
                screenType === "mobile"
                  ? "Calendar--detail-window-last-update-mobile"
                  : "Calendar--detail-window-last-update"
              }
            >
              <p>Naposledy aktualizováno: {selectedEvent.last_update}</p>
            </div>
          </div>
        )}
      </Modal>

      <div
        className={
          screenType === "mobile"
            ? "Calendar--url-button-box-mobile "
            : "Calendar--url-button-box"
        }
      >
        <button onClick={generateCalendarUrl}>Vygenerovat URL</button>
      </div>
      <Modal
        open={showCalendarUrl}
        onClose={() => setShowCalendarUrl(false)}
        classNames={{
          modal:
            screenType === "mobile"
              ? "Calendar--detail-window-mobile"
              : "Calendar--detail-window",
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
