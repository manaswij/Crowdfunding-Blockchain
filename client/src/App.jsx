import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FindCreators from "./pages/FindCreators";
import MyCampaigns from "./pages/MyCampaigns";
import Profile from "./pages/Profile";
import "./styles/app.css";
import TrendingCampaigns from "./pages/TrendingCampaigns";

export default function Home() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <FindCreators /> } />
        <Route path="/campaigns" element={ <MyCampaigns /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/trending" element={ <TrendingCampaigns /> } />
      </Routes>
    </>
  );
}
