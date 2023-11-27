import * as React from "react";
import { useForm } from "react-hook-form";
import { UserDetailsDto } from "../../types/userDetails";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { useParams } from "react-router-dom";
import { GetSingleUserDataApi, UpdateUserDataApi } from "../../api/user";
import { BeatLoader } from "react-spinners";


export default function Index() {

    const { id } = useParams();
    
    const [isEditing, setIsEditing] = React.useState(false);
    const [readMode, setReadMode] = React.useState(true);
    const { data: UserData, isLoading, refetch } = GetSingleUserDataApi(id)
    const { mutate: UpdateUserData, isLoading: isLoadingSongsPost } = UpdateUserDataApi({ setReadMode, refetch, id: id, setIsEditing })

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors }
    } = useForm<UserDetailsDto>({ defaultValues: UserData?.data?.data })


    React.useEffect(() => {
        if (UserData?.data?.data && !isLoading) {
            const {
                IFSCcode,
                accountNumber,
                address,
                bankName,
                beneficiaryName,
                city,
                country,
                email,
                facebook,
                fname,
                googleplus,
                gstNumber,
                gstRegistered,
                instagram,
                linkedin,
                lname,
                panNumber,
                password,
                phoneNumber,
                postCode,
                soundcloud,
                state,
                swiftcode,
                twitter,
                vevo,
                youtube
            } = UserData.data.data;

            setValue("IFSCcode", IFSCcode);
            setValue("accountNumber", accountNumber);
            setValue("address", address);
            setValue("bankName", bankName);
            setValue("beneficiaryName", beneficiaryName);
            setValue("city", city);
            setValue("country", country);
            setValue("email", email);
            setValue("facebook", facebook);
            setValue("fname", fname);
            setValue("googleplus", googleplus);
            setValue("gstNumber", gstNumber);
            setValue("gstRegistered", gstRegistered);
            setValue("instagram", instagram);
            setValue("linkedin", linkedin);
            setValue("lname", lname);
            setValue("panNumber", panNumber);
            setValue("password", password);
            setValue("phoneNumber", phoneNumber);
            setValue("postCode", postCode);
            setValue("soundcloud", soundcloud);
            setValue("state", state);
            setValue("swiftcode", swiftcode);
            setValue("twitter", twitter);
            setValue("vevo", vevo);
            setValue("youtube", youtube);
        }
    }, [UserData, setValue]);



    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        UpdateUserData(newData)
    });
    
    return (
        <>
            <div className="p-6">
                <form onSubmit={(e: any) => {
                    onSubmit(e);
                }}>
                    <div className="flex justify-end">
                        {!isEditing && readMode && (
                            <button
                                type="button"
                                className="bg-neutral-700 hover:bg-neutral-900 text-white mt-3 font-bold py-2 px-4 rounded sm:text-xs md:text-sm lg:text-base"
                                onClick={() => {
                                    setIsEditing(true)
                                    setReadMode(false)
                                }}
                            >
                                Edit
                            </button>
                        )}
                        {isEditing && !readMode && (
                            <>
                                <button
                                    type="submit"
                                    disabled={isLoadingSongsPost}
                                    className="bg-neutral-700 hover:bg-neutral-900 mr-3 text-white mt-3 font-bold py-2 px-4 rounded sm:text-xs md:text-sm lg:text-base"
                                >
                                    {isLoadingSongsPost ? <BeatLoader/> : "Update"}
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-700 text-white mt-3 font-bold py-2 px-4 rounded sm:text-xs md:text-sm lg:text-base"
                                    onClick={() => {
                                        setIsEditing(false)
                                        setReadMode(true)
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold mb-3"><span className="border-b-2 border-black">Profile Details</span></h2>
                    <div className="flex flex-col sm:flex-row items-center sm:sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="First Name" htmlFor="grid-fname" required={true} />
                            <InputField
                                type="text"
                                name="fname"
                                placeholder="Enter firstName"
                                register={register}
                                errors={errors}
                                requiredMessage="firstName is required."
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Last Name" htmlFor="grid-lname" required={true} />
                            <InputField
                                type="text"
                                name="lname"
                                placeholder="Enter last Name"
                                register={register}
                                errors={errors}
                                requiredMessage="last Name is required."
                                disabled={readMode}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:sm:gap-8 mt-1">

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Email" htmlFor="grid-email" required={true} />
                            <InputField
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                register={register}
                                errors={errors}
                                requiredMessage="email is required."
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Password" htmlFor="grid-password" required={true} />
                            <InputField
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                register={register}
                                errors={errors}
                                requiredMessage="password is required."
                                disabled={readMode}
                            />
                        </div>
                    </div>


                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Address" htmlFor="grid-address" required={true} />
                            <InputField
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                register={register}
                                errors={errors}
                                requiredMessage="address is required."
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Phone Number" htmlFor="grid-phoneNumber" required={true} />
                            <InputField
                                type="string"
                                name="phoneNumber"
                                placeholder="Enter Phone No"
                                register={register}
                                errors={errors}
                                requiredMessage="phoneNumber is required."
                                disabled={readMode}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Country" htmlFor="grid-country" required={true} />
                            <InputField
                                type="text"
                                name="country"
                                placeholder="Enter country"
                                register={register}
                                errors={errors}
                                requiredMessage="country is required."
                                disabled={readMode}
                            />
                        </div>
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="State" htmlFor="grid-state" required={true} />
                            <InputField
                                type="text"
                                name="state"
                                placeholder="Enter state"
                                register={register}
                                errors={errors}
                                requiredMessage="state is required."
                                disabled={readMode}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="City" htmlFor="grid-city" required={true} />
                            <InputField
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                register={register}
                                errors={errors}
                                requiredMessage="city is required."
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Post Code" htmlFor="grid-postCode" required={true} />
                            <InputField
                                type="text"
                                name="postCode"
                                placeholder="Enter postCode"
                                register={register}
                                errors={errors}
                                requiredMessage="postCode is required."
                                disabled={readMode}
                            />
                        </div>
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold mb-3"><span className="border-b-2 border-black">GST Settings</span></h2>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="GST Registered?" htmlFor="grid-gstRegistered" required={false} />
                            <InputField
                                type="text"
                                name="gstRegistered"
                                placeholder="Enter gstRegistered"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="GST Number" htmlFor="grid-gstNumber" required={false} />
                            <InputField
                                type="text"
                                name="gstNumber"
                                placeholder="Enter gstNumber"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Pan Number" htmlFor="grid-panNumber" required={true} />
                            <InputField
                                type="text"
                                name="panNumber"
                                placeholder="Enter panNumber"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>


                    </div>
                    <h2 className="text-lg md:text-xl font-semibold mb-3"><span className="border-b-2 border-black">Social Media</span></h2>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Facebook" htmlFor="grid-facebook" required={true} />
                            <InputField
                                type="text"
                                name="facebook"
                                placeholder="Enter facebook"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Instagram" htmlFor="grid-instagram" required={true} />
                            <InputField
                                type="text"
                                name="instagram"
                                placeholder="Enter instagram"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Twitter" htmlFor="grid-twitter" required={false} />
                            <InputField
                                type="text"
                                name="twitter"
                                placeholder="Enter twitter"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Youtube" htmlFor="grid-youtube" required={true} />
                            <InputField
                                type="text"
                                name="youtube"
                                placeholder="Enter youtube"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Google Plus" htmlFor="grid-googleplus" required={false} />
                            <InputField
                                type="text"
                                name="googleplus"
                                placeholder="Enter googleplus"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Linkedin" htmlFor="grid-linkedin" required={false} />
                            <InputField
                                type="text"
                                name="linkedin"
                                placeholder="Enter linkedin"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Vevo" htmlFor="grid-vevo" required={false} />
                            <InputField
                                type="text"
                                name="vevo"
                                placeholder="Enter vevo"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="SoundCloud" htmlFor="grid-soundcloud" required={false} />
                            <InputField
                                type="text"
                                name="soundcloud"
                                placeholder="Enter soundcloud"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>

                    <h2 className="text-lg md:text-xl font-semibold mb-3"><span className="border-b-2 border-black">Bank Information</span></h2>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Beneficiary Name" htmlFor="grid-beneficiaryName" required={true} />
                            <InputField
                                type="text"
                                name="beneficiaryName"
                                placeholder="Enter beneficiaryName"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Bank Name" htmlFor="grid-bankName" required={true} />
                            <InputField
                                type="text"
                                name="bankName"
                                placeholder="Enter bankName"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="IBAN/Account Number" htmlFor="grid-accountNumber" required={true} />
                            <InputField
                                type="text"
                                name="accountNumber"
                                placeholder="Enter accountNumber"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="IFSC Code" htmlFor="grid-IFSCcode" required={true} />
                            <InputField
                                type="text"
                                name="IFSCcode"
                                placeholder="Enter IFSCcode"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                        <div className="w-full sm:w-1/2 mb-2">
                            <Label text="Swift Code" htmlFor="grid-swiftcode" required={false} />
                            <InputField
                                type="text"
                                name="swiftcode"
                                placeholder="Enter swiftcode"
                                register={register}
                                errors={errors}
                                disabled={readMode}
                            />
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}