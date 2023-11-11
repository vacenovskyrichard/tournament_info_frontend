import "../styles/ElevatorText.css";
import { useRecoilValue } from "recoil";
import { screenSize } from "../state/atoms/ScreenSize";

export default function ElevatorText() {
  const screenType = useRecoilValue(screenSize);

  return (
    <div className="ElevatorText">
      {screenType === "mobile" ? (
        <div className="ElevatorText--main-text-mobile">
          <p>Všechny turnaje v beach volejbale na jednom místě</p>
        </div>
      ) : (
        <div className="ElevatorText--main-text">
          <p>
            Hraješ <i>beach volejbal</i> a hledáš, kam půjdeš na turnaj?
          </p>
          <p>Tady najdeš všechny turnájky přehledně na jednom místě.</p>
        </div>
      )}
    </div>
  );
}
