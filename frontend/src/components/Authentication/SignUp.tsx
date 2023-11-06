import * as React from "react";
import { useForm } from "react-hook-form";
import { LoginWithMail } from "../../api/authentication";
import { useNavigate } from "react-router-dom";


type FormValues = {
    email: string;
    password: string;
    checkbox: boolean;
}

export default function Index(){


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({ defaultValues: { email: "", password: "" } })

    const navigate = useNavigate();

    //Sign Up Api Call
    const { mutate: LoginMail, isLoading: isLoadingLoginWithMail } = LoginWithMail(reset, navigate)

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
    });

    return (
        <>
            {/* Container */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                {/* Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                    <form onSubmit={(e:any) => {
                        onSubmit(e);
                    }}>
                        <div className="w-full mb-4">
                            <label
                                className="text-black text-sm my-2 font-semibold mb-2"
                                htmlFor="grid-password"
                            >
                                Email 
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={`border border-[#384152] mt-2 px-3 py-2 placeholder-[#656d7a] text-[#98a0ab] bg-primary rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.email ? 'border-orange-700' : ''}`}
                                {...register('email', {
                                    required: 'email is required.',

                                })}
                            />
                            {errors.email && <p className="text-xs text-orange-700">{errors.email.message}</p>}
                        </div>

                        <div className="w-full mb-4">
                            <label
                                className="left-2 -top-2 text-[#e6e7eb] text-sm my-2 font-semibold mb-2"
                                htmlFor="grid-password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className={`border border-[#384152] mt-2 px-3 py-2 placeholder-[#656d7a] text-[#98a0ab] bg-primary rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.password ? 'border-orange-700' : ''}`}
                                {...register('password', {
                                    required: 'password is required.',
                                    minLength: {
                                        value: 8,
                                        message: 'minimum length of password must be 8'
                                    }
                                })}
                            />
                            {errors.password && <p className="text-xs text-orange-700">{errors.password.message}</p>}
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
                                    className={`ml-2 text-sm font-normal text-[#9aa0ac] ${errors.checkbox ? 'text-orange-700' : ''}`}
                                >
                                    Remember me
                                </span>
                            </label>
                        </div>

                        {
                            isLoadingLoginWithMail ?
                                <button className="w-full py-2 rounded-lg mt-5 bg-blue text-white book-a-call flex justify-center items-center" disabled>
                                    {/* <BeatLoader color='white' /> */}
                                </button>
                                :
                                <button className="w-full py-2 rounded-lg mt-5 bg-[#2f73f0] text-white">
                                    Log in
                                </button>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}