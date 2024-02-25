import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { ClipLoader } from "react-spinners";
import cogoToast from "@successtar/cogo-toast";
import { RegisterWithMailApi } from "../../api/authentication"
import useCaptcha from "../../hooks/useCaptcha";
import { IoReload } from "react-icons/io5";


type FormValues = {
    fname: string;
    lname: string;
    email: string;
    password: string;
    userType: string;
    secretKey: string;
}

export default function SignUp() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<FormValues>()
    const navigate = useNavigate();

    const {
        captcha,
        error,
        input,
        success,
        checkValidCaptcha,
        refreshCaptcha,
        handleInputChange
    } = useCaptcha();

    const userType = watch("userType")

    const backgroundImages = [
        'beautiful-little.jpg',
        'caucasian-woman.jpg',
        'yellow-color.jpg',
        'young-man.jpg'
        // Add more image filenames as needed
    ];

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

    //Register Api Call
    const { mutate: RegisterWithMail, isLoading: isLoadingRegisterWithMail } = RegisterWithMailApi(reset, navigate)

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        let objdata: any = {
            fname: newData.fname,
            lname: newData.lname,
            email: newData.email.toLowerCase(),
            password: newData.password,
            userType: newData.userType
        }
        if (newData?.userType === "Admin" && newData?.secretKey !== "Admin123") {
            cogoToast.error("Invalid Admin");
        } else {
            if (checkValidCaptcha()) {
                // RegisterWithMail(objdata);
            } else {
                cogoToast.error("Please enter a valid captcha.");
            }
        }
    });

    return (
        <>

            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-500 to-indigo-500 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${backgroundImage}), `, backgroundSize: 'cover', }}>
                {/* Card */}
                <div className="bg-[#2d3e50] w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
                    <form onSubmit={(e: any) => {
                        onSubmit(e);
                    }}>
                        <h3 className="text-center text-white font-semibold text-lg tracking-wider">Sign Up</h3>

                        <div className="flex gap-2 items-center my-2">
                            <span className="text-white font-medium mr-4">Register As</span>

                            <label className="inline-flex items-center gap-2">
                                <input
                                    className="form-radio h-5 w-5 text-blue-600 transition-colors duration-200 ease-in-out"
                                    type="radio"
                                    required={true}
                                    defaultChecked
                                    name="userType"
                                    {...register("userType", { required: `userType is required ` })}
                                    value="User"
                                />
                                <span className="text-white">User</span>
                            </label>

                            {/* <label className="inline-flex items-center gap-2">
                                <input
                                    className="form-radio h-5 w-5 text-blue-600 transition-colors duration-200 ease-in-out"
                                    type="radio"
                                    required={true}
                                    name="UserType"
                                    value="Admin"
                                    {...register("userType", { required: `userType is required ` })}
                                />
                                <span className="text-white">Admin</span>
                            </label> */}
                        </div>


                        <div className="w-full mb-2">
                            <Label text="First name" additionalClasses={"text-white"} htmlFor="grid-firstName" />
                            <InputField
                                type="text"
                                name="fname"
                                placeholder="Enter First name"
                                register={register}
                                errors={errors}
                                requiredMessage="First name is required."
                            />
                        </div>

                        <div className="w-full mb-2">
                            <Label text="Last name" additionalClasses={"text-white"} htmlFor="grid-lastName" />
                            <InputField
                                type="text"
                                name="lname"
                                placeholder="Enter Last name"
                                register={register}
                                errors={errors}
                                requiredMessage="Last name is required."
                            />
                        </div>

                        <div className="w-full mb-2">
                            <Label text="Email" additionalClasses={"text-white"} htmlFor="grid-email" />
                            <InputField
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                register={register}
                                errors={errors}
                                requiredMessage="Email is required."
                            />
                        </div>

                        <div className="w-full mb-2">
                            <Label text="Password" additionalClasses={"text-white"} htmlFor="grid-password" />
                            <InputField
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                                requiredMessage="password is required."
                            />
                        </div>
                        

                        <div className="w-full mb-2">
                            <div className="flex items-center space-x-6 justify-between my-2">
                                <p className="bg-white rounded-md text-sm px-4 py-2 text-black">{captcha}</p>
                                <IoReload onClick={refreshCaptcha} size={20} className="text-white cursor-pointer" />
                            </div>
                            <div className="flex items-center justify-between space-x-5">
                                <input
                                    type={"text"}
                                    placeholder={"Enter captcha"}
                                    value={input}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    className={`border-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition ease-in-out duration-150 ${error ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />

                                <button type="button" onClick={checkValidCaptcha} className="px-4 py-2 rounded-full bg-black text-white ">Submit</button>
                            </div>

                            
                            {error &&  (
                                <p className="text-xs text-red-500 mt-1">
                                    {"Captcha is not matched"}
                                </p>
                            )}

                            {success && (
                                <p className="text-xs text-green-500 mt-1">
                                    {"Captcha is matched"}
                                </p>
                            )}
                            
                        </div>

                        {
                            userType === "Admin" && <div className="w-full mb-2">
                                <Label text="Secret Key" additionalClasses={"text-white"} htmlFor="grid-secretKey" />
                                <InputField
                                    type="text"
                                    name="secretKey"
                                    placeholder="Enter your secretKey"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="secretKey is required."
                                />
                            </div>
                        }

                        <button
                            type={isLoadingRegisterWithMail ? "button" : "submit"}
                            className={`w-full mr-auto bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-4 py-2 rounded-md w-full text-center text-base cursor-pointer hover:bg-[#F28C28] tracking-wider font-semibold mt-3`}
                            disabled={isLoadingRegisterWithMail}
                        >
                            {isLoadingRegisterWithMail ? (
                                <ClipLoader color="white" size={25} />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <p className="cursor-pointer font-semibold mt-4 text-white text-right flex items-center justify-end">
                        Already registered ? <Link to={"/sign-in"}><p className="ml-1 text-gray-300">Sign in here</p></Link>
                    </p>
                </div>
            </div>
        </>
    );
}