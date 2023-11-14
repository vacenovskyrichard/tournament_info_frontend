import "../styles/Resources.css";
import { useRecoilValue } from "recoil";
import { screenSize } from "../state/atoms/ScreenSize";

export default function Resource({ isImage, style, imgPath, text1, text2 }) {
  const screenType = useRecoilValue(screenSize);
  return (
    <>
      {isImage ? (
        <div
          className={
            screenType === "mobile"
              ? "Resources--resource-mobile"
              : "Resources--resource"
          }
        >
          <img alt="resource" src={imgPath} style={style} />
        </div>
      ) : (
        <div
          className={
            screenType === "mobile"
              ? "Resources--resource-mobile"
              : "Resources--resource"
          }
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "17px",
          }}
        >
          <h3 style={{ margin: "5px" }}>{text1} </h3>
          {text2 && <h3 style={{ margin: "5px" }}>{text2}</h3>}
        </div>
      )}
    </>
  );
}
