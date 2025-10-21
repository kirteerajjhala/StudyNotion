import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6  mt-20">
      <h1 className="mb-8 text-3xl font-bold text-gray-100 text-center sm:text-left">
        Cart
      </h1>

      <p className="border-b border-gray-600 pb-2 text-lg font-semibold text-gray-400 text-center sm:text-left">
        {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
      </p>

      {total > 0 ? (
        <div className="mt-10 flex flex-col-reverse lg:flex-row items-start gap-8">
          <div className="w-full lg:w-2/3">
            <RenderCartCourses />
          </div>
          <div className="w-full lg:w-1/3">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <p className="mt-14 text-center text-2xl sm:text-3xl text-gray-300">
          Your cart is empty 🛒
        </p>
      )}
    </div>
  );
}
