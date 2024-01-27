import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginWithMailApi } from "../../api/authentication";
import { ClipLoader } from "react-spinners";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import useAuthStore from "../../store/userstore";


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
            <div className="flex justify-end items-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8"
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                {/* Card */}
                <div className="bg-white sm:flex sm:flex-col w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] rounded-lg shadow-lg">
                    <div className="w-full">
                        <img src={`/${backgroundImage}`} className="h-42 object-cover w-full" alt="" />
                    </div>
                    <div className="p-2 sm:p-8 md:p-10 bg-[#2d3e50]">
                        <form onSubmit={(e: any) => {
                            onSubmit(e); e.preventDefault();
                        }}>
                            <h3 className="text-center text-black font-semibold text-xl text-white tracking-wider">User LogIn</h3>
                            <div className="w-full mb-4">
                                <Label text="Email" htmlFor="grid-email" />
                                <InputField
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Email is required."
                                />
                            </div>

                            <div className="w-full mb-4">
                                <Label text="Password" htmlFor="grid-password" />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="password is required."
                                />
                            </div>


                            <button
                                type={isLoadingLoginWithMail ? "button" : "submit"}
                                className={`w-full mr-auto bg-[#E97451] text-white px-4 py-2 rounded-md w-full text-center text-base cursor-pointer hover:bg-[#F28C28] tracking-wider font-semibold mt-3`}
                                disabled={isLoadingLoginWithMail}
                            >
                                {isLoadingLoginWithMail ? (
                                    <ClipLoader color="white" size={25} />
                                ) : (
                                    "Log in"
                                )}
                            </button>

                        </form>

                        <p className="cursor-pointer font-semibold mt-2 text-right text-white">
                            Don't have an account ? <a href="/sign-up" className="text-[#E97451]"> Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}