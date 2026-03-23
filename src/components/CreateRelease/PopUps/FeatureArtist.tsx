import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import { Controller, useForm } from "react-hook-form";
import { FeatureArtistDto } from "../../../types/ReleaseInfo";
import {
  FeaturingArtisttPostApi,
  GetFeaturingArtistApi,
} from "../../../api/releaseInfo";
import { BeatLoader } from "react-spinners";

export default function FeatureArtist({ userData }: { userData: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const size = useResponsiveIconSize();

  // Fetch existing featuring artists for validation
  const { data: existingArtists, isLoading: isLoadingArtists } =
    GetFeaturingArtistApi(userData?.users_id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FeatureArtistDto>();

  // Function to check if artist name already exists
  const checkDuplicateArtist = (artistName: string) => {
    // Don't validate while loading or if no data
    if (isLoadingArtists || !existingArtists?.data?.data) return false;

    return existingArtists.data.data.some(
      (artist: any) =>
        artist.FeaturingArtist?.toLowerCase().trim() ===
        artistName.toLowerCase().trim()
    );
  };

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  // Reset form when modal closes
  const handleCloseModal = () => {
    setIsOpen(false);
    reset();
  };

  //featuringArtisttPost Api Call
  const {
    mutate: featuringArtisttPost,
    isLoading: isLoadingfeaturingArtisttPost,
  } = FeaturingArtisttPostApi(setIsOpen);
  const onSubmit = handleSubmit(async (data: any) => {
    const newData: any = { ...data };
    newData.users_id = Number(userData?.users_id);
    featuringArtisttPost(newData);
  });

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center ml-2 py-1 px-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onClick={() => setIsOpen(true)}
      >
        <AiOutlinePlus size={size} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCloseModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-center font-medium leading-6 text-gray-900"
                >
                  Create Featuring Artist
                </Dialog.Title>
                <form
                  onSubmit={(e: any) => {
                    onSubmit(e);
                  }}
                >
                  <div className="mt-2">
                    <div className="w-full mb-2">
                      <Label
                        text="Featuring Artist Name"
                        htmlFor="grid-firstName"
                        required={true}
                      />
                      <Controller
                        name="FeaturingArtist"
                        control={control}
                        rules={{
                          required: "Featuring Artist Name is required.",
                          validate: (value) => {
                            if (!value) return true; // Let required rule handle empty values
                            return (
                              !checkDuplicateArtist(value) ||
                              "A Featuring Artist with this name already exists. Please use a different name."
                            );
                          },
                        }}
                        render={({ field }) => (
                          <input
                            type="text"
                            placeholder="Enter Featuring Artist Name"
                            value={field.value || ""}
                            name={field.name}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            className={`border-2 mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition ease-in-out duration-150 ${
                              errors?.FeaturingArtist
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            onChange={(e) => {
                              const capitalizedValue = toTitleCase(
                                e.target.value
                              );
                              field.onChange(capitalizedValue);
                            }}
                          />
                        )}
                      />
                      {errors.FeaturingArtist && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.FeaturingArtist.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full mb-2">
                      <Label
                        text="Featuring Artist Apple Id "
                        htmlFor="grid-lastName"
                      />
                      <InputField
                        type="url"
                        name="AppleId"
                        placeholder="Enter Featuring Artist Apple Id "
                        register={register}
                        errors={errors}
                      />
                    </div>

                    <div className="w-full mb-2">
                      <Label
                        text="Featuring Artist Spotify Id "
                        htmlFor="grid-lastName"
                      />
                      <InputField
                        type="url"
                        name="SpotifyId"
                        placeholder="Enter Featuring Artist Spotify Id "
                        register={register}
                        errors={errors}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-full hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={onSubmit}
                      disabled={isLoadingfeaturingArtisttPost}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                    >
                      {isLoadingfeaturingArtisttPost ? (
                        <BeatLoader color="#ffffff" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
