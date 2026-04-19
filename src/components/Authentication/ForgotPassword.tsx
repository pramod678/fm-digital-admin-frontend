import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ReCAPTCHA from "react-google-recaptcha";
import cogoToast from "@successtar/cogo-toast";
import { ForgotPasswordApi } from "../../lib/endpoint";

type FormValues = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { email: "" } });

  const navigate = useNavigate();
  const [captchaVerified, setCaptchaVerified] = React.useState<string | null>(null);

  const { mutate: sendOtp, isLoading } = ForgotPasswordApi(reset, navigate);

  const onSubmit = handleSubmit(async (data) => {
    if (!captchaVerified) {
      return cogoToast.error("Please verify CAPTCHA");
    }

    const payload = {
      email: data.email.toLowerCase(),
    };

    sendOtp(payload);
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
        {/* Logo */}
        <div className="text-center">
          <img
            src="/images/fm-logo/footer-and-header.svg"
            alt="FM DIGITAL"
            className="h-28 mx-auto w-30 -mb-8 -mt-2"
          />
        </div>

        {/* Form Card */}
        <div className="backdrop-blur-sm rounded-2xl pl-1 pr-1 pb-8">
          <h2 className="text-white text-lg font-medium mb-2 text-center">
            Forgot Password
          </h2>

          {/* Horizontal line */}
          <hr className="border-gray-500 mb-6" />

          <form onSubmit={onSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500"
                placeholder=""
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ReCAPTCHA */}
            <div className="my-4 flex justify-center">
              <ReCAPTCHA
                sitekey="6LdFPH8pAAAAAFpZr2CrRBPvCaqoO0iXpLFVGYte"
                onChange={setCaptchaVerified}
                theme="dark"
              />
            </div>

            {/* Submit Button */}
            <button
              type={isLoading ? "button" : "submit"}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="white" size={20} /> : "Send OTP"}
            </button>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-1">
                Already have an account?
              </p>
              <Link
                to="/sign-in"
                className="text-gray-300 hover:text-white text-sm underline transition-colors"
              >
                Go to your dashboard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
