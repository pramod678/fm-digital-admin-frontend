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
        const newData: any = { ...data };
        newData.email = newData.email.toLowerCase()
        LoginMail(newData)
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