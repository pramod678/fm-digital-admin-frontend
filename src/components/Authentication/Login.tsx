import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginWithMailApi } from "../../api/authentication";
import { ClipLoader } from "react-spinners";
import InputField from "../../ui/InputField";
import useAuthStore from "../../store/userstore";
import { FaRegUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import cogoToast from "@successtar/cogo-toast";

type FormValues = {
    email: string;
    password: string;
    checkbox: boolean;
};

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({ defaultValues: { email: "", password: "" } });

    const navigate = useNavigate();
    const { setToken } = useAuthStore();
    const [captchaVerified, setCaptchaVerified] = React.useState<string | null>(null);

    const { mutate: LoginMail, isLoading: isLoadingLoginWithMail } = LoginWithMailApi(
        reset,
        navigate,
        setToken
    );

    const onSubmit = handleSubmit(async (data) => {
        if (!captchaVerified) {
            return cogoToast.error("Please verify CAPTCHA");
        }

        const payload = {
            ...data,
            email: data.email.toLowerCase()
        };
        LoginMail(payload);
    });

    return (
        <div
        className="w-full flex justify-center items-center bg-no-repeat bg-center bg-cover overflow-hidden"
        style={{
          height: "100dvh",
          backgroundImage: "url('/images/fm-logo/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
          {/* Bottom Caption */}
          <p className="absolute bottom-4 left-4 text-white text-xs sm:text-sm z-10">
            The choice of top performers.
          </p>
      
          {/* Login Card */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden z-10">
            {/* Logo and Welcome Text */}
            <div className="text-center pt-6">
              <img
                src="/images/fm-logo/footer-and-header.svg"
                alt="FM DIGITAL"
                className="h-20 mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
              <p className="text-sm text-gray-500 mb-2">Continue with</p>
            </div>
      
            {/* Social Login */}
            <div className="flex justify-center gap-3 mb-3">
              <button className="border px-3 py-2 rounded-md hover:bg-gray-100">
                <img
                  src="/images/fm-logo/apple logo.svg"
                  alt="Apple"
                  className="w-5 h-5"
                />
              </button>
              <button className="border px-3 py-2 rounded-md hover:bg-gray-100">
                <img
                  src="/images/fm-logo/google logo.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
              </button>
            </div>
      
            {/* Divider */}
            <div className="flex items-center px-6 gap-2 mb-4">
              <div className="flex-grow h-px bg-gray-300" />
              <p className="text-xs text-gray-400">OR BY EMAIL</p>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
      
            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="px-6 pb-6"
            >
              {/* Email */}
              <div className="mb-4">
                <InputField
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  register={register}
                  errors={errors}
                  requiredMessage="Email is required"
                />
              </div>
      
              {/* Password */}
              <div className="mb-4">
                <InputField
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  register={register}
                  errors={errors}
                  requiredMessage="Password is required"
                />
              </div>
      
              {/* Captcha */}
              <div className="mb-4 flex justify-center">
                <div className="scale-[0.88] rounded-lg overflow-hidden border border-gray-300 p-1 shadow-md bg-white">
                  <ReCAPTCHA
                    sitekey="6LdFPH8pAAAAAFpZr2CrRBPvCaqoO0iXpLFVGYte"
                    onChange={setCaptchaVerified}
                  />
                </div>
              </div>
      
              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register("checkbox")}
                  />
                  Remember me
                </label>
      
                <p className="text-sm text-blue-500 cursor-pointer hover:underline">
                  Forgot password?
                </p>
              </div>
      
              {/* Sign In Button */}
              <button
                type={isLoadingLoginWithMail ? "button" : "submit"}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-full"
                disabled={isLoadingLoginWithMail}
              >
                {isLoadingLoginWithMail ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  "Sign In"
                )}
              </button>
      
              {/* Sign Up */}
              <p className="text-center text-sm text-gray-700 mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      );
      
      
};

export default LoginPage;
