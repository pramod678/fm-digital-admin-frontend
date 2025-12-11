import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Home from "./components/Home";
import SharedLayout from "./components/SharedLayout";
import Platform from "./components/CreateRelease/Platform";
import SongInfo from "./components/CreateRelease/SongInfo";
import ReleaseInfo from "./components/CreateRelease/ReleaseInfo";
import ManageArtist from "./components/ManageArtist";
import VideoRelease from "./components/CreateRelease/VideoRelease";
import Submission from "./components/CreateRelease/Submission";
import Financial from "./components/Financial";
import EditReleaseInfo from "./components/EditRelease/EditReleaseInfo";
import EditSongsInfo from "./components/EditRelease/EditSongsInfo";
import EditPlatform from "./components/EditRelease/EditPlatform";
import EditSubmission from "./components/EditRelease/EditSubmission";
import UserDetails from "./components/UserDetails";
import CatalogsPage from "./components/Catalogs/CatalogPage";
import AdminCatalogsAudioList from "./components/Catalogs/AdminCatalogsAudioList";
import ManageUserList from "./components/ManageUser/ManageUserList";
import ManageLabelList from "./components/ManageUser/Label/ManageLabelList";
import ManageCatalogsList from "./components/ManageUser/Catalogs/ManageCatalogsList";
import ProfileLinkingPage from "./components/Tools/ProfileLinking/page";
import YouTubeClaimsPage from "./components/Tools/YouTubeClaims/page";
import TicketsPage from "./components/Tickets/page";
import ManageArtistPage from "./components/ManageArtist/page";
import LabelPage from "./components/Label/page";
import CreateReleasePage from "./components/CreateRelease/page";
import FinancialPage from "./components/Financial/Admin/page";
// import UserFinancialAdmin from "./components/Financial/User";
import HistoryIndex from "./components/Financial/History/HistoryIndex";
import DashboardPage from "./components/Dashboard";
import UserAudioCatalog from "./components/Catalogs/User/UserAudioCatalog";
import UserVideoCatalog from "./components/Catalogs/User/UserVideoCatalog";
import UserRejectedSong from "./components/Catalogs/User/UserRejectedSong";
import MusicReleaseCards from "./components/CreateRelease/MusicReleaseCards";
import Index from "./components/Home";



function App() {
  console.log("App.tsx is running")
  return (
    <>
      <Router>
        <div className="App">
          <Routes>  
              {/* <Route path="/" element={<ProtectedRoute> <SharedLayout /></ProtectedRoute>} > */}
               <Route path="/" element={ <SharedLayout />} >
              <Route index element={<Home />} />
              {/* <Route path="ReleseInfo" element={< CreateReleasePage />} /> */}
              <Route path="ReleseInfo" element={<MusicReleaseCards />} />
              <Route path="ReleaseInfo/VideoRelease" element={<VideoRelease />} />
              <Route path="ReleaseInfo/AudioRelease" element={< CreateReleasePage />} />
              <Route path="Platform" element={<Platform />} />
              <Route path="userDetails/:id" element={<UserDetails />} />
              {/* <Route path="Submission" element={<Submission />} /> */}
              <Route path="Songsinfo" element={<SongInfo />} />
              <Route path="ManageUser/" element={<ManageUserList />} />
              <Route path="ManageUser/Labels/:id" element={<ManageLabelList />} />
              <Route path="ManageUser/Catalogs/:id" element={<ManageCatalogsList />} />
              <Route path="Songsinfo" element={<SongInfo />} />
              <Route path="Catalogs" element={<CatalogsPage />} />
              <Route path="CatalogsAudio" element={<AdminCatalogsAudioList />} />
              <Route path="user/catalog/audio" element={<UserAudioCatalog />} />
              <Route path="user/catalog/video" element={<UserVideoCatalog />} />
              <Route path="user/catalog/audio/:id" element={<UserRejectedSong />} />
              <Route path="Submission" element={<Submission />} />
              <Route path="Tools/YoutubeClaims" element={<YouTubeClaimsPage />} />
              <Route path="Tools/ProfileLinking" element={<ProfileLinkingPage />} />
              <Route path="Label" element={<LabelPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="Submission/:id" element={<EditSubmission />} />
               {/* This is for Admin side */}
              <Route path="Financial" element={<FinancialPage />} /> 
              <Route path="ManageArtist" element={<ManageArtistPage />} />
              <Route path="Tickets" element={<TicketsPage />} />
              <Route path="ReleseInfoUpdate/:id" element={<EditReleaseInfo />} />
              <Route path="Songsinfo/:id" element={<EditSongsInfo />} />
              <Route path="Platform/:id" element={<EditPlatform />} />
              {/* This is for User side */}
              <Route path="index" element={<Index/>} />
              
              {/* <Route path="UserFinancial" element={<UserFinancialAdmin />} /> */}
              <Route path="UserFinancialHistory" element={<HistoryIndex />} />
              
            </Route>
            {/* Add other routes here */}
            <Route path="sign-in" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            {/* Add other routes outside of SharedLayout here */}
            <Route path="*" element={<>not found</>} />
          </Routes>
        </div>      
      </Router>
    </>
  );
}

export default App;
