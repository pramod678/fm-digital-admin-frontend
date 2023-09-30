

export default function UserDetails() {
    return (
        <>
            <form onSubmit={(e) => e?.preventDefault()}>
                <div className="p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10">
                    {/* Profile Details */}
                    <h2 className="text-lg md:text-xl font-semibold mb-3"><span className="border-b-2 border-black">Profile Details</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-1 md:p-3">
                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="name" className="text-xs md:text-sm mb-1">
                                Name <span className="text-red-600 text-base">*</span>
                            </label>
                            <input id="name" type="text" placeholder="Enter name" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>


                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="email" className="text-xs md:text-sm mb-1">Email <span className="text-red-600 text-base">*</span></label>
                            <input id="email" type="email" placeholder="Enter email" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="address" className="text-xs md:text-sm mb-1">Address <span className="text-red-600 text-base">*</span></label>
                            <input id="address" type="text" placeholder="Enter address" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Phone No" className="text-xs md:text-sm mb-1">Phone Number  <span className="text-red-600 text-base">*</span></label>
                            <input id="Phone No" type="text" placeholder="Enter Phone No" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Country" className="text-xs md:text-sm mb-1">Country <span className="text-red-600 text-base">*</span></label>
                            <input id="Country" type="text" placeholder="Enter Country" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="State" className="text-xs md:text-sm mb-1">State <span className="text-red-600 text-base">*</span></label>
                            <input id="State" type="text" placeholder="Enter State" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="City" className="text-xs md:text-sm mb-1">City <span className="text-red-600 text-base">*</span></label>
                            <input id="City" type="text" placeholder="Enter City" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Post COde" className="text-xs md:text-sm mb-1">Post Code <span className="text-red-600 text-base">*</span></label>
                            <input id="Post COde" type="text" placeholder="Enter Post Code" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>


                    </div>
                </div>

                <div className="p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10">

                    <h2 className="text-lg md:text-xl font-semibold mb-3"><span className="border-b-2 border-black">GST Settings</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-1 md:p-3">
                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="name" className="text-xs md:text-sm mb-1">
                                GST Registered? <span className="text-red-600 text-base">*</span>
                            </label>
                            <input id="name" type="text" placeholder="" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="name" className="text-xs md:text-sm mb-1">
                                GST Number <span className="text-red-600 text-base">*</span>
                            </label>
                            <input id="name" type="text" placeholder="Enter GST Number" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="name" className="text-xs md:text-sm mb-1">
                                Pan Number <span className="text-red-600 text-base">*</span>
                            </label>
                            <input id="name" type="text" placeholder="Enter Pan no." className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                    </div>
                </div>


                <div className="p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10">

                    {/* Social Media*/}
                    <h2 className="text-lg font-semibold mb-3"><span className="border-b-2 border-black">Social Media</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-1 md:p-3">
                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Facebook" className="text-xs md:text-sm mb-1">Facebook <span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to Facebook page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Instagram" className="text-xs md:text-sm mb-1">Instagram<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to Instagram page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Twitter" className="text-xs md:text-sm mb-1">Twitter<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to Twitter page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Youtube" className="text-xs md:text-sm mb-1">Youtube<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to Youtube page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Google Plus" className="text-xs md:text-sm mb-1">Google Plus<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to Google Plus page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Linkedin" className="text-xs md:text-sm mb-1">Linkedin<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to Linkedin page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Vevo" className="text-xs md:text-sm mb-1">Vevo<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to Vevo page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="SoundCloud" className="text-xs md:text-sm mb-1">SoundCloud<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="URL to SoundCloud page" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                    </div>
                </div>

                <div className="p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10">

                    {/* Bank Information*/}
                    <h2 className="text-lg font-semibold mb-3"><span className="border-b-2 border-black">Bank Information</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-1 md:p-3">
                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="Beneficiary Name" className="text-xs md:text-sm mb-1">Beneficiary Name<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="Enter the Name" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="GST Number" className="text-xs md:text-sm mb-1">Bank Name<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="Enter Bank A/C Number" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="IBAN" className="text-xs md:text-sm mb-1">IBAN/Account Number<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="" className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center w-full">
                            <label htmlFor="IFSC Code" className="text-xs md:text-sm mb-1">IFSC Code<span className="text-red-600 text-base">*</span></label>
                            <input id="name" type="text" placeholder="Enter IFSC no." className="border border-gray-300 focus:outline-none px-3 py-2 text-xs md:text-sm bg-gray-200 w-full sm:w-2/3" />
                        </div>

                    </div>
                </div>

                <div class="flex justify-end">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white mt-3 font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </form>

        </>
    )
}