import Navbar from "../components/Navbar";
function Nopage({ token, removeToken, setToken, apiUrl }) {
  return (
    <>
      <Navbar
        token={token}
        removeToken={removeToken}
        setToken={setToken}
        apiUrl={apiUrl}
        title={"Tady nic nenajdete"}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <img
          className="navbar--logo"
          alt="monkey"
          src="./monkey2.gif"
          style={{
            height: "700px",
            margin: "50px",
          }}
        />
      </div>
    </>
  );
}
export default Nopage;
