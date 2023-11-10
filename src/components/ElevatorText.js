import "../styles/ElevatorText.css";
import { useRecoilValue } from "recoil";
import { screenSize } from "../state/atoms/ScreenSize";

export default function ElevatorText() {
  const screenType = useRecoilValue(screenSize);

  return (
    <div
      className={
        screenType === "mobile" ? "ElevatorText-mobile" : "ElevatorText"
      }
    >
      <div
        className={
          screenType === "mobile"
            ? "ElevatorText--main-text-mobile"
            : "ElevatorText--main-text"
        }
      >
        <p>
          Taky už tě nebaví neustále hledat, kam půjdeš na beachovej turnaj?
          <p>
            Mě taky ne, tak jsem vytvořil portál, kde jsou všechny turnájky na
            jednom místě!
          </p>
        </p>
      </div>
    </div>
  );
}
