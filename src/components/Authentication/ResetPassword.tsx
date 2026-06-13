import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ResetPasswordApi } from "../../api/authV2";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || "";

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: resetPassword, isLoading } = ResetPasswordApi(reset, navigate);

  const onSubmit = handleSubmit((data) => {
    resetPassword({ email, password: data.password });
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
            Reset Password
          </h2>
          <hr className="border-gray-500 mb-6" />

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className="w-full px-4 py-3 pr-10 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === watch("password") || "Passwords do not match",
                  })}
                  className="w-full px-4 py-3 pr-10 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                >
                  {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type={isLoading ? "button" : "submit"}
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
            >
              {isLoading ? <ClipLoader color="white" size={20} /> : "Reset Password"}
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/sign-in"
                className="text-gray-300 hover:text-white text-sm underline transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
