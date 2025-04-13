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
            className="h-screen w-full flex justify-center items-center bg-cover bg-center px-4 relative"
            style={{ backgroundImage: "url('/images/fm-logo/bg.png')" }} // Put your image in public/
        >
    {/* Caption */}
    <p className="absolute bottom-14 left-14 text-white text-sm">The choice of top performers.</p>

            {/* Card */}
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden">
                {/* Top Logo */}
                <div className="text-center pt-6">
                    <img src="/images/fm-logo/footer-and-header.svg" alt="FM DIGITAL" className="h-20 mx-auto mb-2" />
                    <h2 className="text-xl font-semibold">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mb-2">Continue with</p>
                </div>

                {/* Social Buttons */}
                <div className="flex justify-center gap-3 mb-3">
                    <button className="border px-3 py-1 rounded-md hover:bg-gray-100">
                        <img src="/images/fm-logo/apple logo.svg" alt="Apple" className="w-5 h-5" />
                    </button>
                    <button className="border px-3 py-1 rounded-md hover:bg-gray-100">
                        <img src="/images/fm-logo/google logo.svg" alt="Google" className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center px-6 gap-2 mb-4">
                    <div className="flex-grow h-px bg-gray-300" />
                    <p className="text-xs text-gray-400">OR BY EMAIL</p>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }} className="px-6 pb-6">
                    {/* Email */}
                    <div className="mb-4 flex items-center gap-3">
                        {/* <FaRegUser size={18} className="text-gray-500" /> */}
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
                    <div className="mb-4 flex items-center gap-3">
                        {/* <FaLock size={18} className="text-gray-500" /> */}
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
                        <div className="scale-90 rounded-lg overflow-hidden border border-gray-300 p-1 shadow-md bg-white">
                            <ReCAPTCHA
                                sitekey="6LdFPH8pAAAAAFpZr2CrRBPvCaqoO0iXpLFVGYte"
                                onChange={setCaptchaVerified}
                            />
                        </div>
                    </div>


                    {/* Forgot Password */}
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center text-sm text-black">
                            <input
                                type="checkbox"
                                className="mr-2"
                                {...register("checkbox")}
                            />
                            Remember me
                        </label>

                        <p className="text-sm text-black-400 cursor-pointer hover:underline">
                            Forgot password?
                        </p>
                    </div>


                    {/* Buttons */}
                    <button
                        type={isLoadingLoginWithMail ? "button" : "submit"}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-full"
                        disabled={isLoadingLoginWithMail}
                    >
                        {isLoadingLoginWithMail ? <ClipLoader color="white" size={20} /> : "Sign In"}
                    </button>

                    {/* SING UP*/}
                    <p className="text-center text-sm text-black-400 mt-4">
                        Don’t have an account? <Link to="/sign-up" className="font-bold cursor-pointer hover:underline">Sign Up</Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;
