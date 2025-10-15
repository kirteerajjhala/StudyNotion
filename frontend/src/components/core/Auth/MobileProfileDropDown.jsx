import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Img from "./../../common/Img";
import { logout } from "../../../services/operations/authAPI";

import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineHome } from "react-icons/ai";
import { MdOutlineContactPhone } from "react-icons/md";
import { TbMessage2Plus } from "react-icons/tb";
import { PiNotebook } from "react-icons/pi";
import { fetchCourseCategories } from "./../../../services/operations/courseDetailsAPI";

export default function MobileProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  if (!user) return null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useOnClickOutside(ref, () => setOpen(false));

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <button className="relative sm:hidden" onClick={() => setOpen(true)}>
      {/* Profile + Dropdown Icon */}
      <div className="flex items-center gap-1">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-8 rounded-full object-cover border border-gray-300"
        />
        <AiOutlineCaretDown className="text-sm text-gray-300" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className="absolute top-[118%] right-0 z-50 min-w-[140px] rounded-md border border-gray-300 bg-white text-gray-800 shadow-lg divide-y divide-gray-200"
        >
          {/* Dashboard */}
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <VscDashboard className="text-lg text-gray-700" />
              Dashboard
            </div>
          </Link>

          {/* Home */}
          <Link to="/" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <AiOutlineHome className="text-lg text-gray-700" />
              Home
            </div>
          </Link>

          {/* Catalog */}
          <Link to="/" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <PiNotebook className="text-lg text-gray-700" />
              Catalog
            </div>
          </Link>

          {/* About Us */}
          <Link to="/about" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <TbMessage2Plus className="text-lg text-gray-700" />
              About Us
            </div>
          </Link>

          {/* Contact Us */}
          <Link to="/contact" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors">
              <MdOutlineContactPhone className="text-lg text-gray-700" />
              Contact Us
            </div>
          </Link>

          {/* Logout */}
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex items-center gap-2 py-2.5 px-3 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <VscSignOut className="text-lg text-gray-700" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
