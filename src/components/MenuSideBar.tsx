import React from "react";
import { Link } from "react-router-dom";
import type { User } from "../types/user";

type MenuSideBarProps = {
  menuSideBar: React.RefObject<HTMLUListElement | null>;
  isMenuSideBarOpen: boolean;
  activePage: string;
  user: User | null;
  adminManagementLinks: { to: string; label: string }[];
};

const MenuSideBar = ({
  menuSideBar,
  isMenuSideBarOpen,
  activePage,
  user,
  adminManagementLinks,
}: MenuSideBarProps) => {
  return (
    <ul
      ref={menuSideBar}
      className={` fixed left-0 ${
        isMenuSideBarOpen ? "w-full opacity-100" : "w-0 opacity-0"
      } h-[calc(100vh-80px)] pb-2 overflow-y-auto bg-(--color-primary)/10 backdrop-brightness-35 backdrop-blur-xl px-2 flex flex-col gap-3 duration-300`}
    >
      <li>
        <Link
          to="/team"
          className={`block py-1 pl-6 hover:bg-(--color-primary)/20 ${
            activePage === "/team"
              ? "text-(--color-primary) border-l-2 border-(--color-primary)"
              : ""
          }`}
        >
          <i className="fas fa-users mr-3"></i>My Team
        </Link>
      </li>

      <li>
        <Link
          to="/transfer-market"
          className={`block py-1 pl-6 hover:bg-(--color-primary)/20 ${
            activePage === "/transfer-market"
              ? "text-(--color-primary) border-l-2 border-(--color-primary)"
              : ""
          }`}
        >
          <i className="fas fa-exchange-alt mr-3"></i>Transfer Market
        </Link>
      </li>

      <li>
        <Link
          to="/betting"
          className={`block py-1 px-6 hover:bg-(--color-primary)/20 ${
            activePage === "/betting"
              ? "text-(--color-primary) border-l-2 border-(--color-primary)"
              : ""
          }`}
        >
          <i className="fas fa-gavel mr-3"></i>Betting
        </Link>
      </li>

      <li>
        <Link
          to="/dream-team"
          className={`block py-1 pl-6 hover:bg-(--color-primary)/20 ${
            activePage === "/dream-team"
              ? "text-(--color-primary) border-l-2 border-(--color-primary)"
              : ""
          }`}
        >
          <i className="fas fa-star mr-3"></i>Dream Team
        </Link>
      </li>

      <li>
        <Link
          to="/leaderboard"
          className={`block py-1 pl-6 hover:bg-(--color-primary)/20 ${
            activePage === "/leaderboard"
              ? "text-(--color-primary) border-l-2 border-(--color-primary)"
              : ""
          }`}
        >
          <i className="fas fa-trophy mr-3"></i>Leaderboard
        </Link>
      </li>

      {user?.role === "ADMIN" && (
        <li>
          <details className="group">
            <summary className="cursor-pointer pl-6 py-1 hover:bg-(--color-primary)/20 flex justify-between items-center">
              <div>
                <i className="fas fa-cogs mr-3"></i>
                Admin
              </div>
              <i className="fas fa-chevron-right group-open:rotate-90 duration-300"></i>
            </summary>
            <ul className="flex flex-col pl-6 border-l-2 border-(--color-primary)">
              {adminManagementLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className={`block py-1 border-b border-gray-400 ${
                      item.to.endsWith(activePage)
                        ? "text-(--color-primary)"
                        : ""
                    } hover:bg-(--color-primary)/20`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
      )}

      <li>
        <Link
          to="/profile"
          className={`block py-1 pl-6 hover:bg-(--color-primary)/20 ${
            activePage === "/profile"
              ? "text-(--color-primary) border-l-2 border-(--color-primary)"
              : ""
          }`}
        >
          <i className="fas fa-user mr-3"></i>Profile
        </Link>
      </li>
    </ul>
  );
};

export default MenuSideBar;
