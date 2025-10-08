import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from '../../../common/ConfirmationModal.jsx';
import { deleteProfile } from "../../../../services/operations/SettingsAPI.js";

export default function DeleteAccount() {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [check, setCheck] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "Deleting your account is permanent and cannot be undone!",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(deleteProfile(token, navigate)),
      btn2Handler: () => {
        setConfirmationModal(null);
        setCheck(false);
      },
    });
  };

  return (
    <>
      <div className="my-10 flex flex-col sm:flex-row gap-5 rounded-lg border border-red-700 bg-red-900 p-6 sm:p-8">
        {/* Trash Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-700">
          <FiTrash2 className="text-3xl text-red-200" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <h2 className="text-lg font-semibold text-white">Delete Account</h2>

          <div className="mt-2 text-red-100 flex flex-col gap-2 sm:w-3/5">
            <p>Would you like to delete your account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>

          {/* Checkbox + Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-red-600 cursor-pointer"
              checked={check}
              onChange={() => setCheck(prev => !prev)}
            />
            <button
              type="button"
              disabled={!check}
              onClick={handleDeleteClick}
              className={`italic ${check ? 'text-red-300 cursor-pointer' : 'text-red-500 cursor-not-allowed'}`}
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
