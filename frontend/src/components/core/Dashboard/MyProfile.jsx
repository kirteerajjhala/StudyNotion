import { useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";
import Img from "../../common/Img";


export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
<div className="flex w-full mt-20 lg:justify-center">

  
      <div  className="w-full">
   
      <h1 className="mb-8 text-3xl sm:text-4xl font-semibold text-center sm:text-left text-gray-100">
        My Profile
      </h1>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 gap-4 ">
        <div className="flex items-center gap-4">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`} 
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-100 capitalize">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

      <IconBtn
  text="Edit"
  onClick={() => navigate("/dashboard/settings")} // <- Capital C
>
  <RiEditBoxLine />
</IconBtn>

      </div>

      {/* About Section */}
      <div className="my-8 bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-100">About</p>
     <IconBtn
  text="Edit"
  onClick={() => navigate("/dashboard/settings")} // <- Capital C
>
  <RiEditBoxLine />
</IconBtn>

        </div>
        <p
          className={`text-sm font-medium ${
            user?.additionalDetails?.about ? "text-gray-100" : "text-gray-400"
          }`}
        >
          {user?.additionalDetails?.about || "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details */}
      <div className="my-8 bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-100">Personal Details</p>
  <IconBtn
  text="Edit"
  onClick={() => navigate("/dashboard/settings")} // <- Capital C
>
  <RiEditBoxLine />
</IconBtn>

        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">First Name</p>
              <p className="text-sm font-semibold text-gray-100 capitalize">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Account Type</p>
              <p className="text-sm font-semibold text-gray-100 capitalize">
                {user?.accountType}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-sm font-semibold text-gray-100">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Gender</p>
              <p className="text-sm font-semibold text-gray-100">
                {user?.additionalDetails?.gender || "Add Gender"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Last Name</p>
              <p className="text-sm font-semibold text-gray-100 capitalize">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Phone Number</p>
              <p className="text-sm font-semibold text-gray-100">
                {user?.additionalDetails?.contactNumber || "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Date of Birth</p>
              <p className="text-sm font-semibold text-gray-100">
                {formattedDate(user?.additionalDetails?.dateOfBirth) || "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}
