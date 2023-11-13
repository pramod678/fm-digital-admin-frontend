import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Home from "./components/Home";
import SharedLayout from "./components/SharedLayout";
import Catalogs from "./components/Catalogs";
import ProfileLinking from "./components/Tools/ProfileLinking";
import YouTubeClaims from "./components/Tools/YouTubeClaims";
import Label from "./components/Label";
import Platform from "./components/CreateRelease/Platform";
import SongInfo from "./components/CreateRelease/SongInfo";
import ReleaseInfo from "./components/CreateRelease/ReleaseInfo";
import ManageArtist from "./components/ManageArtist";
import EditManageArtist from "./components/ManageArtist/EditManageArtist";
import Submission from "./components/CreateRelease/Submission";
import Financial from "./components/Financial";



function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>  
            <Route path="/" element={<ProtectedRoute> <SharedLayout /></ProtectedRoute>} >
              <Route index element={<Home />} />
              <Route path="ReleseInfo" element={< ReleaseInfo />} />
              <Route path="Platform" element={<Platform />} />
              {/* <Route path="Submission" element={<Submission />} /> */}
              <Route path="Songsinfo" element={<SongInfo />} />
              <Route path="Catalogs" element={<Catalogs />} />
              <Route path="Submission" element={<Submission />} />
              <Route path="Tools/YoutubeClaims" element={<YouTubeClaims />} />
              <Route path="Tools/ProfileLinking" element={<ProfileLinking />} />
              <Route path="Label" element={<Label />} />
              <Route path="Financial" element={<Financial />} />
              <Route path="ManageArtist" element={<ManageArtist />} />
              <Route path="ManageArtist/:id" element={<EditManageArtist />} />
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
