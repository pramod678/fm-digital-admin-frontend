import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";


function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
           
            {/* Add other routes here */}
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            {/* Add other routes outside of SharedLayout here */}
            <Route path="*" element={<>not found</>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
