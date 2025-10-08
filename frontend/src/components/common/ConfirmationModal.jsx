import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-50">
          {modalData?.text1}
        </h2>

        {/* Description */}
        <p className="mt-3 mb-6 text-sm text-gray-200 leading-relaxed">
          {modalData?.text2}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          {/* Primary Button */}
         <IconBtn
  onClick={modalData?.btn1Handler}  // <-- camelCase "onClick"
  text={modalData?.btn1Text}
  customClasses="w-full sm:w-auto"
/>


          {/* Secondary Button */}
          <button
            onClick={modalData?.btn2Handler}
            className="w-full sm:w-auto rounded-md bg-gray-700 text-gray-50 py-2 px-5 font-semibold hover:bg-gray-900 hover:text-yellow-50 transition-colors duration-300"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
