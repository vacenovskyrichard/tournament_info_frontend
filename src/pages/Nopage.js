import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Nopage({}) {
  return (
    <>
      <Navbar title={"Tady nic nenajdete"} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          height: "120vh",
        }}
      >
        <img
          className="navbar--logo"
          alt="monkey"
          src="./monkey2.gif"
          style={{
            top: "20px",
            width: "90%",
            height: "auto",
            margin: "50px",
          }}
        />
      </div>
      <Footer />
    </>
  );
}
export default Nopage;
