import "../styles/ChangePassword.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ChangePassword({
  token,
  removeToken,
  setToken,
  apiUrl,
}) {
  return (
    <>
      <Navbar
        token={token}
        removeToken={removeToken}
        setToken={setToken}
        apiUrl={apiUrl}
        title={"Změna hesla"}
      />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100vh" }}
      >
        <h1
          style={{
            margin: "30px",
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "50px",
          }}
        >
          Tady na tom se ještě pracuje (:{" "}
        </h1>
      </div>
      <Footer />
    </>
  );
}
