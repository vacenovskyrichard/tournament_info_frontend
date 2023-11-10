import "../styles/CalendarTableButtons.css";

export default function CalendarTableButtons({
  showData,
  setShowData,
  isTabletOrMobile,
}) {
  return (
    <div
      className={
        isTabletOrMobile ? "Content-buttons--mobile" : "Content-buttons"
      }
    >
      <div className="Content-buttons-body">
        <button
          className={showData ? "isActive" : "notActive"}
          onClick={() => setShowData(true)}
        >
          Tabulka
        </button>
        <button
          className={showData ? "notActive" : "isActive"}
          onClick={() => setShowData(false)}
        >
          Kalendář
        </button>
      </div>
    </div>
  );
}
