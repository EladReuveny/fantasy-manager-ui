import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import Betting from "./pages/Betting";
import CountriesManagement from "./pages/CountriesManagement";
import DreamTeam from "./pages/DreamTeam";
import Landpage from "./pages/Landpage";
import Leaderboard from "./pages/Leaderboard";
import PlayerDetails from "./pages/PlayerDetails";
import PlayerManagement from "./pages/PlayersManagement";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TransferMarket from "./pages/TransferMarket";
import UserTeam from "./pages/UserTeam";
import UsersManagement from "./pages/UsersManagement";
import PlayersManagement from "./pages/PlayersManagement";
import ClubsManagement from "./pages/ClubsManagement";
import ClubDetails from "./pages/ClubDetails";

const Layout = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/auth");

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        pauseOnHover
        className={"z-100"}
      />
      {!hideLayout && <Header />}
      <main className="min-h-screen py-20 px-5">
        <Routes>
          <Route path="/" element={<Landpage />} />
          <Route path="/team" element={<UserTeam />} />
          <Route path="/transfer-market" element={<TransferMarket />} />
          <Route path="/betting" element={<Betting />} />
          <Route path="/dream-team" element={<DreamTeam />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/admin/players" element={<PlayersManagement />} />
          <Route path="/admin/clubs" element={<ClubsManagement />} />
          <Route path="/admin/countries" element={<CountriesManagement />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/players/:playerId" element={<PlayerDetails />} />
          <Route path="/clubs/:clubId" element={<ClubDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
const App = () => {
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
};

export default App;
