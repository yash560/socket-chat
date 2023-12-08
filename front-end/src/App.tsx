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
        <Route path='/signup' element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {loggedIn ? (
            <Route path="/" element={
              <div className="app">
                <Menubar />
                <Mainbar />
              </div>
            } />
          ) : (
            <Route path="/*" element={<Navigate to="/signup" />} />
          )}
      </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
