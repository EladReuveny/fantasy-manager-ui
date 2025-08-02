import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const location = useLocation();
  const activePage = location.pathname;

  return (
    <header className="px-5 bg-(--color-bg-darker) ">
      <nav>
        <ul className="flex justify-between items-center text-gray-300">
          <li>
            <Link
              to={"/"}
              className="hover:drop-shadow-[0_0_1px_var(--color-text)]"
            >
              <Logo />
            </Link>
          </li>
          <li>
            <Link
              to="/team"
              className={`flex flex-col items-center justify-center pb-[2px] border-b ${
                activePage === "/team"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent hover:border-(--color-text) hover:text-(--color-text)"
              }`}
            >
              <i className="fas fa-users"></i>My Team
            </Link>
          </li>

          <li>
            <Link
              to={"/transfer-market"}
              className={`flex flex-col items-center justify-center pb-[2px] border-b ${
                activePage === "/transfer-market"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent hover:border-(--color-text) hover:text-(--color-text)"
              }`}
            >
              <i className="fas fa-exchange-alt"></i>Transfer Market
            </Link>
          </li>
          <li>
            <Link
              to={"/betting"}
              className={`flex flex-col items-center justify-center pb-[2px] border-b ${
                activePage === "/betting"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent hover:border-(--color-text) hover:text-(--color-text)"
              }`}
            >
              <i className="fas fa-gavel"></i>Betting
            </Link>
          </li>

          <li>
            <Link
              to={"/dream-team"}
              className={`flex flex-col items-center justify-center pb-[2px] border-b ${
                activePage === "/dream-team"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent hover:border-(--color-text) hover:text-(--color-text)"
              }`}
            >
              <i className="fas fa-star"></i>Dream Team
            </Link>
          </li>
          <li>
            <Link
              to={"/leaderboard"}
              className={`flex flex-col items-center justify-center pb-[2px] border-b ${
                activePage === "/leaderboard"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent hover:border-(--color-text) hover:text-(--color-text)"
              }`}
            >
              <i className="fas fa-trophy"></i>Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to={"/profile"}
              className={`flex flex-col items-center justify-center pb-[2px] border-b ${
                activePage === "/profile"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent hover:border-(--color-text) hover:text-(--color-text)"
              }`}
            >
              <i className="fas fa-user"></i>Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
