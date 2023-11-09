import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginWithMailApi } from "../../api/authentication";
import { ClipLoader } from "react-spinners";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";


type FormValues = {
    email: string;
    password: string;
    checkbox: boolean;
}

export default function Index() {


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({ defaultValues: { email: "", password: "" } })
    const navigate = useNavigate();

    //Login Api Call
    const { mutate: LoginMail, isLoading: isLoadingLoginWithMail } = LoginWithMailApi(reset, navigate)

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        console.log("newData", newData)
        LoginMail(newData)
    });

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
                {/* Card */}
                <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] p-4 sm:p-8 md:p-10 rounded-lg shadow-lg">
                    <form onSubmit={(e: any) => {
                        onSubmit(e); e.preventDefault();
                    }}>
                        <h3 className="text-center text-black font-semibold text-lg tracking-wider">Log In</h3>
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

                        <div className="flex justify-between mt-2">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    {...register('checkbox', {
                                        required: 'text is required.',
                                    })}
                                    id="customCheckLogin"
                                    type="checkbox"
                                    className={`form-checkbox rounded-lg border-gray-300 bg-transparent text-[#9aa0ac] ml-1 w-5 h-5 ease-linear transition-all duration-150 ${errors.checkbox ? 'border-orange-700' : ''} `}
                                />
                                <span className="ml-2 text-sm font-semibold text-blueGray-600"></span>
                                <span
                                    className={`ml-2 text-sm font-normal font-semibold text-[#9aa0ac] ${errors.checkbox ? 'text-orange-700' : ''}`}
                                >
                                    Remember me
                                </span>
                            </label>
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

                    <p className="cursor-pointer font-semibold mt-2 text-right">
                        Don't have an account ? <a href="/sign-up" className="text-[#E97451]"> Sign up</a>
                    </p>
                </div>
            </div>
        </>
    )
}