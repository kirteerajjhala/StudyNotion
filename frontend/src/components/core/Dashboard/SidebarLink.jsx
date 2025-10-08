import * as Icons from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

import { resetCourseState } from "../../../slices/courseSlice";
import { setOpenSideMenu } from "../../../slices/sidebarSlice";

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]; // Dynamically select the icon
  const location = useLocation();
  const dispatch = useDispatch();

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);

  // Check if current route matches this link
  const matchRoute = (route) => {
    return matchPath({ path: route, end: false }, location.pathname);
  };

  // Handle click on sidebar link
  const handleClick = () => {
    dispatch(resetCourseState()); // Reset course state
    // Close sidebar on mobile after navigation
    if (openSideMenu && screenSize <= 640) {
      dispatch(setOpenSideMenu(false));
    }
  };

  const isActive = matchRoute(link.path);

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`
        relative px-6 sm:px-8 py-2 text-sm sm:text-base font-medium transition-all duration-200 rounded-md
        flex items-center gap-2
        ${isActive ? "bg-yellow-500 text-yellow-50" : "text-gray-300 hover:bg-gray-700"}
      `}
    >
      {/* Highlight bar on active link */}
      <span
        className={`absolute left-0 top-0 h-full w-1 bg-yellow-500 rounded-r
          ${isActive ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
      ></span>

      {Icon && <Icon className="text-lg sm:text-xl" />}
      <span>{link.name}</span>
    </NavLink>
  );
}
