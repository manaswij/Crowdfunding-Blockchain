import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FindCreators from "./pages/FindCreators";
import Campaigns from "./pages/Campaigns";
import Profile from "./pages/Profile";
import "./styles/app.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <FindCreators /> } />
        <Route path="/campaigns" element={ <Campaigns /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Routes>
    </>
  );
}
