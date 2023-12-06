import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Mainbar from "./components/Mainbar/Mainbar";
import Menubar from "./components/Menubar/Menubar";
import Signup from "./pages/signup";
import Login from "./pages/login";

const App = () => {
  const loggedIn=localStorage.getItem('currUser');
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/*" element={loggedIn ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <div className="app">
          <Menubar />
          <Mainbar />
        </div>
        } />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
