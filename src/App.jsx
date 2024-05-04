import "./App.css";
import { IoMdRefreshCircle } from "react-icons/io";
import logo from "./assets/sunwireless.svg";
import Dashboard from "./components/Dashboard/Dashboard";
import Button from "../../../packages/shared/Button";

function App() {
  return (
    <div className="app">
      <header>
        <Button>Click</Button>
        <div>
          <div className="logo">
            <img src={logo} alt="sun with waves" /> <h3>Weather 99</h3>
          </div>
          <button className="btn" onClick={() => window.location.reload()}>
            {" "}
            <span>
              <IoMdRefreshCircle />
            </span>{" "}
            Refresh
          </button>
        </div>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
