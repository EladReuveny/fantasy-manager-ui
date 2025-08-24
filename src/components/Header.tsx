import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MenuSideBar from "./MenuSideBar";
import NavBar from "./NavBar";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const [isMenuSideBarOpen, setIsMenuSideBarOpen] = useState(false);

  const location = useLocation();
  const activePage = location.pathname;

  const menuSideBar = useRef<HTMLUListElement | null>(null);

  const { user, signOut } = useAuth();

  const adminManagementLinks: {
    to: string;
    label: string;
  }[] = [
    { to: "/admin/players", label: "Players" },
    { to: "/admin/clubs", label: "Clubs" },
    { to: "/admin/competitions", label: "Competitions" },
    { to: "/admin/countries", label: "Countries" },
    { to: "/admin/users", label: "Users" },
  ];

  useEffect(() => {
    if (isMenuSideBarOpen) {
      setIsMenuSideBarOpen(false);
    }
  }, [location.pathname]);

  const toggleMenuSideBar = () => {
    if (isMenuSideBarOpen) {
      setIsMenuSideBarOpen(false);
    } else {
      setIsMenuSideBarOpen(true);
    }
  };

  return (
    <header className="fixed top-0 z-100 w-full bg-(--color-bg) px-5">
      <NavBar
        toggleMenuSideBar={toggleMenuSideBar}
        isMenuSideBarOpen={isMenuSideBarOpen}
        user={user}
        signOut={signOut}
      />

      <MenuSideBar
        menuSideBar={menuSideBar}
        isMenuSideBarOpen={isMenuSideBarOpen}
        activePage={activePage}
        user={user}
        adminManagementLinks={adminManagementLinks}
      />
    </header>
  );
};

export default Header;
