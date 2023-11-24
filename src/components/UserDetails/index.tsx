import * as React from "react";
import { useForm } from "react-hook-form";
import { UserDetailsDto } from "../../types/userDetails";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { AiFillSave } from "react-icons/ai";


export default function Index(){

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<UserDetailsDto>()

    
    return (
        <>
            <div className="w-full p-3">
                <div className="flex flex-col sm:flex-row items-center sm:sm:gap-8 mt-1">
                    <div className="w-full mb-2">
                        <Label text="Name" htmlFor="grid-name" required={true} />
                        <InputField
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            register={register}
                            errors={errors}
                            requiredMessage="name is required."
                        />
                    </div>

                    <div className="w-full mb-2">
                        <Label text="Email" htmlFor="grid-labemailelName" required={true} />
                        <InputField
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            register={register}
                            errors={errors}
                            requiredMessage="email is required."
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                    <div className="w-full mb-2">
                        <Label text="Address" htmlFor="grid-address" required={true} />
                        <InputField
                            type="text"
                            name="address"
                            placeholder="Enter address"
                            register={register}
                            errors={errors}
                            requiredMessage="address is required."
                        />
                    </div>

                    <div className="w-full mb-2">
                        <Label text="Phone Number" htmlFor="grid-ReleaseDate" required={true} />
                        <InputField
                            type="number"
                            name="phoneNumber"
                            placeholder="Enter Phone No"
                            register={register}
                            errors={errors}
                            requiredMessage="phoneNumber is required."
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                    <div className="w-full mb-2">
                        <Label text="Country" htmlFor="grid-country" required={true} />
                        <InputField
                            type="text"
                            name="country"
                            placeholder="Enter country"
                            register={register}
                            errors={errors}
                            requiredMessage="country is required."
                        />
                    </div>
                    <div className="w-full mb-2">
                        <Label text="State" htmlFor="grid-state" required={true} />
                        <InputField
                            type="text"
                            name="state"
                            placeholder="Enter state"
                            register={register}
                            errors={errors}
                            requiredMessage="state is required."
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                    <div className="w-full mb-2">
                        <Label text="City" htmlFor="grid-city" required={true} />
                        <InputField
                            type="text"
                            name="city"
                            placeholder="Enter city"
                            register={register}
                            errors={errors}
                            requiredMessage="city is required."
                        />
                    </div>

                    <div className="w-full mb-2">
                        <Label text="Post Code" htmlFor="grid-postCode" required={true} />
                        <InputField
                            type="text"
                            name="postCode"
                            placeholder="Enter postCode"
                            register={register}
                            errors={errors}
                            requiredMessage="postCode is required."
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                    <div className="w-full mb-2">
                        <Label text="GST Registered" htmlFor="grid-gstRegistered" required={false} />
                        <InputField
                            type="text"
                            name="gstRegistered"
                            placeholder="Enter gstRegistered"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="mt-4 w-full flex justify-center items-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-700 text-white text-base rounded hover:bg-gray-600 focus:outline-none flex items-center"
                            // disabled={isLoadingReleaseInfoPost}
                        >
                            <span className="mr-2">Save</span>
                            <AiFillSave />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}