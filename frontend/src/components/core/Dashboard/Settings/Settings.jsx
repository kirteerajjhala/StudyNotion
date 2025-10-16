import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 mt-10">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center sm:text-left">
        Edit Profile
      </h1>

      {/* Change Profile Picture */}
      <ChangeProfilePicture />

      {/* Profile Information */}
      <EditProfile />

      {/* Update Password */}
      <UpdatePassword />

      {/* Delete Account */}
      <DeleteAccount />
    </div>
  );
}
