export default function IconBtn({
  text,
  onClick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center cursor-pointer justify-center gap-x-2 rounded-md py-2 px-5 font-semibold transition-colors duration-300
        ${outline ? "border border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50 hover:text-black" : "bg-yellow-500 text-white hover:bg-yellow-400 hover:text-yellow-50"}
        ${disabled ? "cursor-not-allowed opacity-50 hover:bg-none hover:text-current" : ""}
        ${customClasses}
      `}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
