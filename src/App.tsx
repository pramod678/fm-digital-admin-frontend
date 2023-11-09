import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Home from "./components/Home";
import SharedLayout from "./components/SharedLayout";


function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>  
            <Route path="/" >
              <Route index element={<SharedLayout> <Home /></SharedLayout>}
              />
            </Route>
            {/* Add other routes here */}
            <Route path="sign-in" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
            {/* Add other routes outside of SharedLayout here */}
            <Route path="*" element={<>not found</>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
