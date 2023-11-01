import "../styles/Resources.css";

export default function Resource({ isImage, style, imgPath, text1, text2 }) {
  return (
    <>
      {isImage ? (
        <div className="Resources--resource">
          <img alt="resource" src={imgPath} style={style} />
        </div>
      ) : (
        <div
          className="Resources--resource"
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "25px",
          }}
        >
          <h3 style={{ margin: "5px" }}>{text1} </h3>
          {text2 && <h3 style={{ margin: "5px" }}>{text2}</h3>}
        </div>
      )}
    </>
  );
}
