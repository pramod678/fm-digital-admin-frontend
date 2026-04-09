import * as React from "react";
import { AiFillSave } from "react-icons/ai";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { Controller, useForm } from "react-hook-form";
import { ReleaseInfoDto } from "../../types/ReleaseInfo";
import {
  GetFeaturingArtistApi,
  GetGenreApi,
  GetPrimaryArtistApi,
  ReleaseInfoPostApi,
  UserDataApi,
} from "../../api/releaseInfo";
import FeatureArtist from "./PopUps/FeatureArtist";
import SelectGenre from "../../ui/SelectGenre";
import SelectFeatureArtist from "../../ui/SelectFeatureArtist";
import PrimaryArtist from "./PopUps/PrimaryArtist";
import SelectPrimaryArtist from "../../ui/SelectPrimaryArtist";
import { Link, useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../ui/ImageUpload";
import AppHeader from "../SharedLayout/AppHeader";
import CreateReleaseTabs from "./CreateReleaseTabs";

export default function ReleaseInfo() {
  const { id } = useParams();
  const [userData, setUserData] = React.useState<any>("");
  const [selectedItems, setSelectedItems] = React.useState("Single");
  const items = ["Single", "EP", "Album"];

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReleaseInfoDto>();
  const [file, setFile] = React.useState(null);
  const token = localStorage.getItem("token");

  //Api calls
  const { mutate: getUserData } = UserDataApi(
    setUserData,
    navigate
  );
  const { data: genre } = GetGenreApi();
  const { data: GetFeaturingArtist } = GetFeaturingArtistApi(
    userData?.users_id
  );
  const { data: GetPrimaryArtist } = GetPrimaryArtistApi(userData?.users_id);
  const { mutate: ReleaseInfoPost, isLoading: isLoadingReleaseInfoPost } =
    ReleaseInfoPostApi(navigate);

  const tabs = [
    { name: "Release Info", route: "ReleaseInfo/AudioRelease" },
    { name: "Song Info", route: "ReleaseInfo/Songsinfo" },
    { name: "Platform", route: "ReleaseInfo/Platform" },
    { name: "Submission", route: "ReleaseInfo/Submission" },
  ];

  React.useEffect(() => {
    getUserData({ token: token });
  }, []);

  const handleClick = (item: any) => {
    setSelectedItems(item);
  };

  // Calculate minimum date (6 days from today)
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + 6);

  const formatDate = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const minReleaseDate = formatDate(targetDate);

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const onSubmit = handleSubmit(async (data: any) => {
    const newData: any = { ...data };

    let formData: any = new FormData();
    formData.append("ImageDocument", file);
    formData.append("ReleaseType", selectedItems);
    formData.append("ReleaseTitle", toTitleCase(newData.ReleaseTitle));
    formData.append("PrimaryArtist", newData.PrimaryArtist);
    formData.append("FeaturingArtist", newData.FeaturingArtist);
    formData.append("Genre", newData.Genre);
    formData.append("SubGenre", toTitleCase(newData.SubGenre));
    formData.append("LabelName", toTitleCase(newData.LabelName));
    formData.append("ReleaseDate", newData.ReleaseDate);
    formData.append("PLine", `FM Digital Official On Behalf Of ${newData.PLine}`);
    formData.append("CLine", newData.CLine);
    formData.append("UPCEAN", newData.UPCEAN);
    // AdditionalInfo is optional — send empty string if not filled
    formData.append("AdditionalInfo", newData.AdditionalInfo || "");
    // @ts-ignore
    formData.append("users_id", parseInt(userData.users_id));
    // @ts-ignore
    formData.append("Status", parseInt(0));
    ReleaseInfoPost(formData);
  });

  return (
    <div className="h-full bg-white flex flex-col">
       <AppHeader title="Create Audio Release" />

      {/* Tabs / Stepper */}
      <CreateReleaseTabs activeTab="Release Info" />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
        <form onSubmit={onSubmit} className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Column - Thumbnail & Guidelines */}
            <div className="w-full lg:w-72 flex-shrink-0 flex flex-col items-center lg:items-start space-y-6">
              <div className="w-full flex justify-center lg:justify-start">
                  <FileUpload file={file} setFile={setFile} />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 w-full">
                <h6 className="font-semibold text-teal-600 mb-2 text-sm">
                  Artwork Guidelines
                </h6>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Accepted formats: .png, JPEG</li>
                  <li>Max file size: 2MB</li>
                  <li>Square dimensions required (e.g. 3000 x 3000)</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="flex-1 space-y-6">
              
              {/* Release Type Pills */}
              <div>
                <Label text="Release Type" htmlFor="releaseType" required={true} />
                <div className="flex flex-wrap gap-3 mt-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleClick(item)}
                      className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                        selectedItems === item
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Column 1 */}
                <div className="space-y-4">
                  <div>
                    <Label text="Release Title" htmlFor="ReleaseTitle" required={true} />
                    <Controller
                      name="ReleaseTitle"
                      control={control}
                      rules={{ required: "Release Title is required." }}
                      render={({ field }) => (
                        <input
                          {...field}
                          value={field.value || ""}
                          placeholder="Enter Release Title"
                          className={`w-full mt-1.5 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-teal-500 transition ${
                            errors?.ReleaseTitle ? "border-red-500" : "border-gray-300"
                          }`}
                          onChange={(e) => field.onChange(toTitleCase(e.target.value))}
                        />
                      )}
                    />
                    {errors.ReleaseTitle && <p className="text-red-500 text-xs mt-1">{errors.ReleaseTitle.message}</p>}
                  </div>

                  <div>
                     <Label text="Primary Artist" htmlFor="PrimaryArtist" required={true} />
                     <div className="flex gap-2 mt-1.5">
                       <div className="flex-1">
                          <SelectPrimaryArtist
                            control={control}
                            name="PrimaryArtist"
                            errors={errors}
                            required={true}
                            id={userData?.users_id}
                          />
                       </div>
                       <PrimaryArtist userData={userData} />
                     </div>
                  </div>

                   <div>
                     <Label text="Featuring Artist" htmlFor="FeaturingArtist" required={false} />
                     <div className="flex gap-2 mt-1.5">
                       <div className="flex-1">
                          <SelectFeatureArtist
                            control={control}
                            name="FeaturingArtist"
                            errors={errors}
                            required={false}
                            id={userData?.users_id}
                          />
                       </div>
                       <FeatureArtist userData={userData} />
                     </div>
                  </div>

                  <div>
                    <Label text="Genre" htmlFor="Genre" required={true} />
                    <div className="mt-1.5">
                        <SelectGenre
                        control={control}
                        name="Genre"
                        options={genre?.data?.data || []}
                        errors={errors}
                        required={true}
                        />
                    </div>
                  </div>

                  <div>
                    <Label text="Sub Genre" htmlFor="SubGenre" />
                    <Controller
                      name="SubGenre"
                      control={control}
                      render={({ field }) => (
                         <input
                          {...field}
                          value={field.value || ""}
                          placeholder="Enter SubGenre"
                          className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-teal-500"
                          onChange={(e) => field.onChange(toTitleCase(e.target.value))}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div>
                    <Label text="Label Name" htmlFor="LabelName" required={true} />
                    <Controller
                      name="LabelName"
                      control={control}
                      rules={{ required: "LabelName is required." }}
                      render={({ field }) => (
                        <input
                          {...field}
                          value={field.value || ""}
                          placeholder="Enter Label Name"
                          className={`w-full mt-1.5 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-teal-500 transition ${
                            errors?.LabelName ? "border-red-500" : "border-gray-300"
                          }`}
                          onChange={(e) => field.onChange(toTitleCase(e.target.value))}
                        />
                      )}
                    />
                    {errors.LabelName && <p className="text-red-500 text-xs mt-1">{errors.LabelName.message}</p>}
                  </div>

                  <div>
                    <Label text="Release Date" htmlFor="ReleaseDate" required={true} />
                    <input
                      type="date"
                      min={minReleaseDate}
                      className={`w-full mt-1.5 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-teal-500 transition ${
                         errors?.ReleaseDate ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("ReleaseDate", { required: "ReleaseDate is required." })}
                    />
                  </div>

                  <div>
                    <Label text="PLine" htmlFor="PLine" required={true} />
                    <div className="mt-1.5 flex flex-col sm:flex-row items-stretch">
                      <span className="flex items-center px-3 py-2 sm:py-0 bg-gray-100 border sm:border-r-0 border-b-0 sm:border-b border-gray-300 rounded-t-md sm:rounded-none sm:rounded-l-md text-gray-500 text-sm lg:whitespace-nowrap select-none overflow-hidden text-ellipsis">
                        FM Digital Official On Behalf Of
                      </span>
                      <Controller
                        name="PLine"
                        control={control}
                        rules={{ required: "PLine Label Name is required." }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="(Label Name)"
                            className={`flex-1 w-full px-3 py-2 border rounded-b-md sm:rounded-none sm:rounded-r-md text-sm outline-none focus:ring-2 focus:ring-teal-500 transition ${
                              errors?.PLine ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        )}
                      />
                    </div>
                    {errors.PLine && <p className="text-red-500 text-xs mt-1">{errors.PLine.message as React.ReactNode}</p>}
                  </div>

                  <div>
                    <Label text="CLine" htmlFor="CLine" required={true} />
                    <div className="mt-1.5">
                        <InputField
                        type="text"
                        name="CLine"
                        placeholder="Enter CLine"
                        register={register}
                        errors={errors}
                        requiredMessage="CLine is required."
                        />
                    </div>
                  </div>

                  <div>
                    <Label text="UPC/EAN" htmlFor="UPCEAN" />
                    <div className="mt-1.5">
                        <InputField
                        type="number"
                        name="UPCEAN"
                        placeholder="Enter UPC/EAN"
                        register={register}
                        errors={errors}
                        />
                    </div>
                  </div>
                </div>
              </div>

               {/* Additional Info — optional free-text field for extra release notes */}
                <div>
                  <Label text="Additional Info (optional)" htmlFor="AdditionalInfo" />
                  <Controller
                    name="AdditionalInfo"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        value={field.value || ""}
                        placeholder="Enter any additional information or special requests here..."
                        rows={5}
                        className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-teal-500 resize-none transition"
                      />
                    )}
                  />
                </div>

               {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition shadow-sm text-sm font-medium"
                    disabled={isLoadingReleaseInfoPost}
                  >
                    Save & Next <AiFillSave />
                  </button>
                </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
