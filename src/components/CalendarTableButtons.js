import "../styles/CalendarTableButtons.css";
import { useRecoilValue } from "recoil";
import { screenSize } from "../state/atoms/ScreenSize";

export default function CalendarTableButtons({ showData, setShowData }) {
  const screenType = useRecoilValue(screenSize);

  return (
    <div
      className={
        screenType === "mobile" ? "Content-buttons--mobile" : "Content-buttons"
      }
    >
      <div
        className={
          screenType === "mobile"
            ? "Content-buttons-body--mobile"
            : "Content-buttons-body"
        }
      >
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
