import { Link } from "react-router-dom";
import type { User } from "../types/user";
import Logo from "./Logo";

type NavBarProps = {
  toggleMenuSideBar: () => void;
  isMenuSideBarOpen: boolean;
  user: User | null;
  signOut: () => void;
};

const NavBar = ({
  toggleMenuSideBar,
  isMenuSideBarOpen,
  user,
  signOut,
}: NavBarProps) => {
  return (
    <nav className="flex justify-between items-center">
      <button
        onClick={toggleMenuSideBar}
        className="cursor-pointer border rounded-full py-0.5 px-1"
      >
        {isMenuSideBarOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>
      <Link to={"/"} className="hover:drop-shadow-[0_0_1px_var(--color-text)]">
        <Logo />
      </Link>
      {user ? (
        <Link
          to={"/auth/sign-in"}
          className="py-2 px-3 border border-(--color-primary) bg-(--color-primary) text-(--color-bg) rounded hover:bg-(--color-bg) hover:text-(--color-primary)"
          onClick={signOut}
        >
          <i className="fas fa-sign-out-alt mr-2"></i>Sign Out
        </Link>
      ) : (
        <div className="flex gap-2">
          <Link
            to={"/auth/sign-up"}
            className="py-2 px-3 border border-(--color-primary) text-(--color-primary) rounded hover:bg-(--color-primary) hover:text-(--color-bg)"
          >
            <i className="fas fa-user-plus mr-2"></i>Sign Up
          </Link>
          <Link
            to={"/auth/sign-in"}
            className="py-2 px-3 border border-(--color-primary) bg-(--color-primary) text-(--color-bg) rounded hover:bg-(--color-bg) hover:text-(--color-primary)"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
