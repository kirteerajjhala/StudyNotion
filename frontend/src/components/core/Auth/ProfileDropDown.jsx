import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";
import Img from "../../common/Img";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <div className="relative hidden sm:flex" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <Img
          src={user.image}
          alt={`profile-${user.firstName}`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-white text-sm" />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-48 divide-y divide-gray-700 overflow-hidden rounded-md border border-gray-700 bg-gray-800 shadow-lg z-50">
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>

          <button
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
