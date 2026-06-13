import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { VerifyOtpApi } from "../../api/authV2";

type FormValues = {
  otp: string;
};

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: verifyOtp, isLoading } = VerifyOtpApi(navigate);

  const onSubmit = handleSubmit((data) => {
    verifyOtp({ email, otp: data.otp });
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/fm-logo/bg.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center">
          <img
            src="/images/fm-logo/footer-and-header.svg"
            alt="FM DIGITAL"
            className="h-28 mx-auto w-30 -mb-8 -mt-2"
          />
        </div>

        <div className="backdrop-blur-sm rounded-2xl pl-1 pr-1 pb-8">
          <h2 className="text-white text-lg font-medium mb-2 text-center">
            Verify OTP
          </h2>
          <hr className="border-gray-500 mb-6" />

          {email && (
            <p className="text-gray-300 text-sm text-center mb-4">
              OTP sent to <span className="text-white font-medium">{email}</span>
            </p>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: { value: 4, message: "Invalid OTP" },
                })}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500 tracking-widest text-center text-lg"
                placeholder="------"
                maxLength={8}
                autoComplete="one-time-code"
              />
              {errors.otp && (
                <p className="text-red-400 text-sm mt-1">{errors.otp.message}</p>
              )}
            </div>

            <button
              type={isLoading ? "button" : "submit"}
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
            >
              {isLoading ? <ClipLoader color="white" size={20} /> : "Verify OTP"}
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/forgot-password"
                className="text-gray-300 hover:text-white text-sm underline transition-colors"
              >
                Resend OTP
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
