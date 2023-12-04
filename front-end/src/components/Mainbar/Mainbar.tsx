import Chatbar from "../Chatbar/Chatbar";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Mainbar.css";

function Mainbar() {
  return (
    <div className="mainbar_container">
      <Navbar />
      <div className="mainbar_components">
        <Sidebar />
        <Chatbar />
      </div>
    </div>
  );
}

export default Mainbar;
