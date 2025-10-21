import React, { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavbarLinks } from "../../../data/navbar-links";
import studyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";

import ProfileDropDown from "../core/Auth/ProfileDropDown";
import MobileProfileDropDown from "../core/Auth/MobileProfileDropDown";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch categories:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  // Navbar show/hide on scroll
  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      setShowNavbar(window.scrollY > lastScrollY ? "hide" : "show");
    } else setShowNavbar("top");
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full py-5 items-center justify-center border-b bg-gray-800 text-white transition-transform duration-300 ${
        showNavbar === "hide"
          ? "-translate-y-full"
          : showNavbar === "show"
          ? "translate-y-0 shadow-md"
          : ""
      }`}
    >
      <div className="flex w-11/12 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={studyNotionLogo}
            width={160}
            height={42}
            loading="lazy"
            alt="StudyNotion Logo"
          />
        </Link>

        {/* Nav Links for large screens */}
        <ul className="hidden sm:flex gap-x-6 text-gray-200 items-center">
          {NavbarLinks.map((link, index) => (
            <li key={index} className="relative group">
              {link.title === "Catalog" ? (
                <>
                  <div
                    className={`flex cursor-pointer items-center gap-1 rounded-xl p-2 px-3 ${
                      matchRoute("/catalog/:catalogName")
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <p>{link.title}</p>
                    <MdKeyboardArrowDown />
                  </div>

                  {/* Dropdown */}
                  <div className="absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 mt-2 flex-col rounded-lg bg-white text-black shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 lg:w-72">
                    {loading ? (
                      <p className="text-center p-4 text-gray-700">Loading...</p>
                    ) : subLinks.length ? (
                      subLinks.map((subLink, i) => (
                        <Link
                          key={i}
                          to={`/catalog/${subLink.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          className="block w-full px-4 py-2 hover:bg-gray-100 rounded"
                        >
                          {subLink.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-center p-4 text-gray-700">No Courses Found</p>
                    )}
                  </div>
                </>
              ) : (
                <Link to={link?.path}>
                  <p
                    className={`rounded-xl p-2 px-3 ${
                      matchRoute(link?.path)
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right side buttons */}
        <div className="flex items-center gap-x-4">
          {user && user?.accountType === "Student" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-5xl text-white rounded-full p-2 hover:bg-gray-700 duration-200" />
              {totalItems > 0 && (
                <span className="absolute -top-0 right-0 grid h-5 w-5 place-items-center rounded-full bg-yellow-400 text-black text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login">
                <button
                  className={`px-3 py-1 rounded-md border ${
                    matchRoute("/login")
                      ? "border-yellow-400 text-black"
                      : "border-gray-700 text-white bg-gray-800"
                  }`}
                >
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={`px-3 py-1 rounded-md border ${
                    matchRoute("/signup")
                      ? "border-yellow-400 text-black"
                      : "border-gray-700 text-white bg-gray-800"
                  }`}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {/* Profile Dropdown */}
          {token && <ProfileDropDown />}
          {token && <MobileProfileDropDown />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
