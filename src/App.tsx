import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import Betting from "./pages/Betting";
import DreamTeam from "./pages/DreamTeam";
import Landpage from "./pages/Landpage";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import TransferMarket from "./pages/TransferMarket";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="min-h-screen py-3">
          <Routes>
            <Route path="/" element={<Landpage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/transfer-market" element={<TransferMarket />} />
            <Route path="/betting" element={<Betting />} />
            <Route path="/dream-team" element={<DreamTeam />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  );
};

export default App;
