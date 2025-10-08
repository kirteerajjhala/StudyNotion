import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id);
    await buyCourse(token, courses, user, navigate, dispatch);
  };

  return (
    <div className="w-full sm:min-w-[280px] rounded-md border border-gray-600 bg-gray-800 p-6 flex flex-col gap-4">
      <p className="text-sm font-medium text-gray-400">Total:</p>
      <p className="text-3xl font-semibold text-yellow-400">₹ {total}</p>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
}
