import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "../src/components/Sidebar/SideBar";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
//  SideBar Nev from ;
import Catalogs from "./pages/Catalogs";
import Label from "./pages/Label";
import Tickets from "./pages/Tickets";
import YoutubeClaims from "./pages/Tolls/YoutubeClaims";
import ProfileLinking from "./pages/Tolls/ProfileLinking";
import FAQ from "./pages/FAQ";
import Songsinfo from "./pages/SongsInfo";
import Platform from "./pages/Platform";
import Submission from "./pages/Submission";
import { FiYoutube } from "react-icons/fi";
import SharedLayout from "./components/SharedLayout";
import Home from "./components/Home"
import UserDetails from "./components/userDetails";
import ReleseInfo from "./pages/ReleseInfo"
import ProtectedRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
            <Route index element={<Home />}
            />
            <Route path="userDetails" element={<UserDetails />} />
            <Route path="Platform" element={<Platform />} />
            <Route path="Submission" element={<Submission />} />
            <Route path="Songsinfo" element={<Songsinfo />} />
            <Route path="Catalogs" element={<Catalogs />} />
            <Route path="Label" element={<Label />} />
            <Route path="Tickets" element={<Tickets />} />
            <Route path="Tools/YoutubeClaims" element={<YoutubeClaims />} />
            <Route path="Tools/ProfileLinking" element={<ProfileLinking />} />
            <Route path="FAQ" element={<FAQ />} />
            <Route path="ReleseInfo" element={<ReleseInfo />} />
            <Route path="ReleseInfoUpdate/:id" element={<ReleseInfo />} />
          </Route>
          {/* Add other routes here */}
          <Route path="sign-in" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
          {/* Add other routes outside of SharedLayout here */}
          <Route path="*" element={<>not found</>} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;


// <Router>
//   <div className="App">
//     {/* <SideBar> */}
//     <Routes>
//       <Route
//         exact
//         path="/"
//         element={isLoggedIn === "true" ? <UserDetails /> : <Login />}
//       />
//       <Route path="/sign-in" element={<Login />} />
//       <Route path="/sign-up" element={<SignUp />} />
{/* <Route path="/userDetails" element={<UserDetails />} />
                  <Route path="/Platform" element={<Platform />} />
                  <Route path="/Submission" element={<Submission />} />
                  <Route path="/Songsinfo" element={<Songsinfo />} />
                  <Route path="/ReleseInfo" element={<ReleseInfo />} />
                  <Route path="/Catalogs" element={<Catalogs />} />
                  <Route path="/Label" element={<Label />} />
                  <Route path="/Tickets" element={<Tickets />} />
                  <Route path="/Tools/YoutubeClaims" element={<YoutubeClaims />} />
                  <Route path="/Tools/ProfileLinking" element={<ProfileLinking />} />
                  <Route path="/FAQ" element={<FAQ />} /> */}

//       <Route path="*" element={<> not found</>} />
//     </Routes>
//     {/* </SideBar> */}
//     {/* <ImageUpload/> */}
//   </div>
// </Router>