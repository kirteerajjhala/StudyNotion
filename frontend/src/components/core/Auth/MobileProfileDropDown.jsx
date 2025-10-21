import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Img from "./../../common/Img";
import { logout } from "../../../services/operations/authAPI";
import { fetchCourseCategories } from "../../../services/operations/courseDetailsAPI";

import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineHome } from "react-icons/ai";
import { MdOutlineContactPhone } from "react-icons/md";
import { TbMessage2Plus } from "react-icons/tb";
import { PiNotebook } from "react-icons/pi";

export default function MobileProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  if (!user) return null;

  const dispatch = useDispatch();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

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

  return (
    <button
      className="relative sm:hidden"
      onClick={() => setOpen((prev) => !prev)}
    >
      {/* Profile Icon */}
      <div className="flex items-center gap-1">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-8 rounded-full object-cover border border-gray-300"
        />
        <AiOutlineCaretDown className="text-sm text-black" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          ref={ref}
          className="absolute top-[110%] right-0 z-50 min-w-[180px] rounded-md border border-gray-800 bg-white shadow-lg divide-y divide-gray-200 text-black"
        >
          {/* Dashboard */}
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          {/* Home */}
          <Link to="/" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <AiOutlineHome className="text-lg" />
              Home
            </div>
          </Link>

   {/* Catalog */}
<div
  className="flex items-center justify-between gap-2 py-2.5 px-3 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
  onClick={(e) => {
    e.stopPropagation(); // <- Important
    setCatalogOpen((prev) => !prev);
  }}
>
  <div className="flex items-center gap-2">
    <PiNotebook className="text-lg" />
    <span className="font-medium">Catalog</span>
  </div>
  <AiOutlineCaretDown
    className={`transition-transform duration-200 ${
      catalogOpen ? "rotate-180" : "rotate-0"
    }`}
  />
</div>

{/* Catalog Sublinks */}
{catalogOpen && (
  <div
    onClick={(e) => e.stopPropagation()} // <- Stop dropdown from closing
    className="flex flex-col bg-gray-50 border-t gap-3 border-gray-200"
  >
    {loading ? (
      <p className="py-2 px-6 text-sm text-gray-600">Loading...</p>
    ) : subLinks.length ? (
      subLinks.map((subLink, i) => (
        <Link
          key={i}
          to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
          className="py-2 text-left px-6  text-sm hover:bg-gray-500 rounded"
          onClick={() => setOpen(false)}
        >
          {subLink.name}
        </Link>
      ))
    ) : (
      <p className="py-2 px-6 text-sm text-gray-600">No Courses Found</p>
    )}
  </div>
)}


          {/* About Us */}
          <Link to="/about" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <TbMessage2Plus className="text-lg" />
              About Us
            </div>
          </Link>

          {/* Contact Us */}
          <Link to="/contact" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <MdOutlineContactPhone className="text-lg" />
              Contact Us
            </div>
          </Link>

          {/* Logout */}
          <div
            onClick={() => {
              dispatch(logout());
              setOpen(false);
            }}
            className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
