import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import Img from "./../../../common/Img";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-full">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex flex-col sm:flex-row items-start justify-between gap-6 w-full ${
            indx !== cart.length - 1 ? "border-b border-gray-600 pb-6" : ""
          } ${indx !== 0 ? "mt-6" : ""}`}
        >
          {/* Left Section - Course Info */}
          <div className="flex flex-col xl:flex-row gap-4 flex-1 w-full">
            {/* Course Thumbnail */}
            <Img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full sm:w-[220px] h-[160px] rounded-lg object-cover"
            />

            {/* Course Details */}
            <div className="flex flex-col space-y-2 w-full">
              <p className="text-lg font-semibold text-gray-100">
                {course?.courseName}
              </p>
              <p className="text-sm text-gray-400">{course?.category?.name}</p>

              {/* Ratings */}
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-medium">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length || 0}
                  size={20}
                  edit={false}
                  activeColor="#facc15"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-gray-400 text-sm">
                  {course?.ratingAndReviews?.length || 0} Ratings
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Remove + Price */}
          <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 rounded-md border border-gray-500 bg-gray-800 text-red-300 py-2 px-4 hover:bg-gray-700 transition"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>

            <p className="text-2xl font-semibold text-yellow-400">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
