<<<<<<< HEAD
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginWithMailApi } from "../../api/authentication";
import { ClipLoader } from "react-spinners";
import Label from "../../ui/Label";
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
}

const backgroundImages = [
    'beautiful-little.jpg',
    'caucasian-woman.jpg',
    'yellow-color.jpg',
    'young-man.jpg'
    // Add more image filenames as needed
];

export default function Index() {


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({ defaultValues: { email: "", password: "" } })
    const navigate = useNavigate();
    const { setToken } = useAuthStore()
    const [cap, setCaap] = React.useState(null)
    const [backgroundImage, setBackgroundImage] = React.useState('');
    const selectBackgroundImage = () => {
        const date = new Date();
        const dayOfMonth = date.getDate(); // Get the day of the month (1-31)
        const index = (dayOfMonth - 1) % backgroundImages.length; // Calculate index based on the day
        setBackgroundImage(backgroundImages[index]);
    };



    React.useEffect(() => {
        selectBackgroundImage(); // Select background image when the component mounts
    }, []);

    //Login Api Call
    const { mutate: LoginMail, isLoading: isLoadingLoginWithMail } = LoginWithMailApi(reset, navigate, setToken)

    const onSubmit = handleSubmit(async (data: any) => {
        if(cap){
            const newData: any = { ...data };
            newData.email = newData.email.toLowerCase()
            LoginMail(newData)
        }else{
            cogoToast.success("verify captcha");
        }
        
    });

    return (
        <>
            <div className="flex justify-end items-center h-screen w-[100%] bg-gray-100 px-4 sm:px-6 lg:px-8 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
                {/* Card */}
                <div className="bg-white sm:flex sm:flex-col w-full sm:w-[25%] rounded-lg shadow-lg">
                    <div >
                        <img src={`/${backgroundImage}`} className="h-42 object-cover w-42 rounded-t-lg" alt="" />
                    </div>
                    <div className="p-2 sm:p-8 md:p-6 bg-[#2d3e50] rounded-b-lg">
                        <form onSubmit={(e: any) => {
                            onSubmit(e);
                            e.preventDefault();
                        }}>
                            <h3 className="text-center text-black font-semibold text-xl text-white mb-4">User LogIn</h3>
                            <div className="mb-4">
                                <div className="flex items-center gap-4">
                                    <FaRegUser size={20} color="white" />
                                    <InputField
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        register={register}
                                        errors={errors}
                                        requiredMessage="Email is required."
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center gap-4">
                                    <FaLock size={20} color="white" />
                                    <InputField
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        register={register}
                                        errors={errors}
                                        requiredMessage="Password is required."
                                    />
                                </div>
                            </div>

                            <ReCAPTCHA sitekey="6LdFPH8pAAAAAFpZr2CrRBPvCaqoO0iXpLFVGYte" onChange={(val) => setCaap(val)} />

                            <p className="text-gray-300 my-1 text-end font-semibold text-sm cursor-pointer">Forgot Password ? </p>
                            <div className="flex justify-between gap-2">
                                <button
                                    type={isLoadingLoginWithMail ? "button" : "submit"}
                                    className={`bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-4 py-2 rounded-full text-center text-base cursor-pointer hover:bg-[#F28C28] font-bold mt-3`}
                                    disabled={isLoadingLoginWithMail}
                                >
                                    {isLoadingLoginWithMail ? (
                                        <ClipLoader color="white" size={25} />
                                    ) : (
                                        "Log in"
                                    )}
                                </button>
                                <Link to={"/sign-up"}>
                                    <button
                                        type={"button"}
                                        className={`bg-gradient-to-r from-teal-500 to-indigo-500 font-bold text-white px-4 py-2 rounded-full text-center text-base cursor-pointer hover:bg-[#F28C28] mt-3`}
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
=======
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
          className="w-full min-h-[100dvh] bg-no-repeat bg-center bg-cover relative flex justify-center items-center px-4"
          style={{
            backgroundImage: "url('/images/fm-logo/bg.png')",
            backgroundSize: "cover",
          }}
        >
          {/* Footer Caption */}
          <p className="absolute bottom-4 left-4 text-white text-xs sm:text-sm z-10">
            The choice of top performers.
          </p>
      
          {/* Login Card */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Logo */}
            <div className="text-center pt-6 px-4">
              <img
                src="/images/fm-logo/footer-and-header.svg"
                alt="FM DIGITAL"
                className="h-20 mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
              <p className="text-sm text-gray-500 mb-2">Continue with</p>
            </div>
      
            {/* Social Login */}
            <div className="flex justify-center gap-3 mb-3 px-4">
              <button className="border px-3 py-2 rounded-md hover:bg-gray-100">
                <img src="/images/fm-logo/apple logo.svg" alt="Apple" className="w-5 h-5" />
              </button>
              <button className="border px-3 py-2 rounded-md hover:bg-gray-100">
                <img src="/images/fm-logo/google logo.svg" alt="Google" className="w-5 h-5" />
              </button>
            </div>
      
            {/* Divider */}
            <div className="flex items-center px-6 gap-2 mb-4">
              <div className="flex-grow h-px bg-gray-300" />
              <p className="text-xs text-gray-400">OR BY EMAIL</p>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
      
            {/* Form Scrollable */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[65vh]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                <InputField
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  register={register}
                  errors={errors}
                  requiredMessage="Email is required"
                />
      
                <InputField
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  register={register}
                  errors={errors}
                  requiredMessage="Password is required"
                />
      
                <div className="my-4 flex justify-center">
                  <div className="scale-[0.88] rounded-lg overflow-hidden border border-gray-300 p-1 shadow-md bg-white">
                    <ReCAPTCHA
                      sitekey="6LdFPH8pAAAAAFpZr2CrRBPvCaqoO0iXpLFVGYte"
                      onChange={setCaptchaVerified}
                    />
                  </div>
                </div>
      
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" className="mr-2" {...register("checkbox")} />
                    Remember me
                  </label>
                  <p className="text-sm text-blue-500 cursor-pointer hover:underline">Forgot password?</p>
                </div>
      
                <button
                  type={isLoadingLoginWithMail ? "button" : "submit"}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-full"
                  disabled={isLoadingLoginWithMail}
                >
                  {isLoadingLoginWithMail ? <ClipLoader color="white" size={20} /> : "Sign In"}
                </button>
      
                <p className="text-center text-sm text-gray-700 mt-4">
                  Don’t have an account?{" "}
                  <Link to="/sign-up" className="font-bold text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      );
      


};

export default LoginPage;
>>>>>>> 41dd8b6341e16e4abb1d7810761386846104ef2e
