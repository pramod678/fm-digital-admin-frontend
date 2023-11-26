import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { ClipLoader } from "react-spinners";
import cogoToast from "cogo-toast";
import { RegisterWithMailApi } from "../../api/authentication"


type FormValues = {
    fname: string;
    lname:string;
    email:string;
    password: string;
    userType:string;
    secretKey:string;
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

    const userType = watch("userType")

    //Register Api Call
    const { mutate: RegisterWithMail, isLoading: isLoadingRegisterWithMail } = RegisterWithMailApi(reset, navigate)

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        let objdata :any = {
            fname: newData.fname,
            lname: newData.lname,
            email: newData.email,
            password: newData.password,
            userType: newData.userType
        }
        if (newData?.userType === "Admin" && newData?.secretKey !== "Admin123") { 
            cogoToast.error("Invalid Admin");
        } else {
            RegisterWithMail(objdata)
        }
    });

    return (
        <>

            <div className="flex justify-center items-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
                {/* Card */}
                <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
                    <form onSubmit={(e: any) => {
                        onSubmit(e); 
                    }}>
                        <h3 className="text-center text-black font-semibold text-lg tracking-wider">Sign Up</h3>

                        <div className="flex gap-2 items-center my-2">
                            <span className="text-gray-700 font-medium mr-4">Register As</span>

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
                                <span className="text-gray-700">User</span>
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
                                <span className="text-gray-700">Admin</span>
                            </label> */}
                        </div>


                        <div className="w-full mb-2">
                            <Label text="First name" htmlFor="grid-firstName" />
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
                            <Label text="Last name" htmlFor="grid-lastName" />
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

                        <div className="w-full mb-2">
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

                        {
                            userType === "Admin" && <div className="w-full mb-2">
                                <Label text="Secret Key" htmlFor="grid-secretKey" />
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
                            className={`w-full mr-auto bg-[#E97451] text-white px-4 py-2 rounded-md w-full text-center text-base cursor-pointer hover:bg-[#F28C28] tracking-wider font-semibold mt-3`}
                            disabled={isLoadingRegisterWithMail}
                        >
                            {isLoadingRegisterWithMail ? (
                                <ClipLoader color="white" size={25} />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <p className="cursor-pointer font-semibold mt-4 text-right">
                        Already registered ? <a href="/sign-in" className="text-[#E97451]">Sign in here</a>
                    </p>
                </div>
            </div>
        </>
    );
}