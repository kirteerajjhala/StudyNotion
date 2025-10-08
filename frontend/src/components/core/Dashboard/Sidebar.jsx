import { useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal.jsx";
import SidebarLink from "./SidebarLink";
import Loading from "../../common/Loading";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { setOpenSideMenu, setScreenSize } from "../../../slices/sidebarSlice";

export default function Sidebar() {

  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  // Track screen size for responsive sidebar
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Auto-close sidebar on small screens
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setOpenSideMenu(false));
    } else {
      dispatch(setOpenSideMenu(true));
    }
  }, [screenSize, dispatch]);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-gray-700 bg-gray-800">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div
        className="sm:hidden text-white absolute left-6 top-3 cursor-pointer z-50"
        onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}
      >
        {openSideMenu ? <IoMdClose size={28} /> : <HiMenuAlt1 size={28} />}
      </div>

      {/* Sidebar */}
      {openSideMenu && (
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[222px] flex-col border-r-[1px] border-gray-700 bg-gray-800 py-10">
          <div className="flex flex-col mt-6">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  iconName={link.icon}
                  setOpenSideMenu={setOpenSideMenu}
                />
              );
            })}
          </div>

          <div className="mx-auto mt-6 mb-6 h-px w-10/12 bg-gray-700" />

          <div className="flex flex-col items-center  gap-2">
        <div className="w-full ">
              <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName={"VscSettingsGear"}
              setOpenSideMenu={setOpenSideMenu}
            />
        </div>

         {/* logout  */}
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="w-full "
            >
              <div className="flex items-center gap-2 px-6 py-2 text-sm  font-medium text-gray-300 hover:bg-gray-700 rounded-md">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
