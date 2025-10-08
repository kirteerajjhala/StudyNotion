import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import Loading from "../components/common/Loading";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

    const inputStyle = {
    width: '60px',       // input ki width
    height: '60px',      // input ki height
    fontSize: '24px',    // font size
    borderRadius: '8px', // rounded corners
    border: '1px solid #ccc',
    textAlign: 'center',
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md sm:max-w-lg rounded-2xl bg-gray-800 px-10 py-12 shadow-2xl border border-gray-700">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-white text-center">
            Verify Your Email
          </h1>
          <p className="mt-3 mb-8 text-center text-gray-300 text-sm sm:text-base">
            A 6-digit verification code has been sent to your email.  
            Please enter the code below to verify your account.
          </p>

          {/* OTP Form */}
          <form onSubmit={handleVerifyAndSignup} className="space-y-8">
            <div className="flex justify-center w-full ">
<OtpInput className =""
  value={otp}
  onChange={setOtp}
  numInputs={6}
  shouldAutoFocus
  
  renderInput={(props) => (
    <input
      {...props} style={inputStyle}
      className="w-16 h-16  text-3xl font-bold text-center rounded-xl 
                 border-2 border-gray-500 bg-gray-900 text-white 
                 focus:outline-none focus:ring-2 focus:ring-yellow-400 
                 focus:border-yellow-400 transition-all duration-200 
                 placeholder:text-gray-500"
      placeholder="•"
    />
  )}
  containerStyle={{
    display: "flex",
    justifyContent: "center",
    gap: "24px",
  }}
/>


            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-400 py-3 px-4 font-semibold text-gray-900 hover:bg-yellow-300 transition-all text-base sm:text-lg shadow-md"
            >
              Verify Email
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/signup"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
              <BiArrowBack size={18} /> Back to Signup
            </Link>

            <button
              type="button"
              onClick={() => {
                dispatch(sendOtp(signupData.email, navigate));
                setOtp("");
              }}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
            >
              <RxCountdownTimer size={18} /> Resend Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
