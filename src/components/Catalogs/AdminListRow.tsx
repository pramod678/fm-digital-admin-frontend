import * as React from "react";
import { FaChevronDown, FaChevronUp, FaSpotify } from "react-icons/fa6";
import { UpdateAdminCatalogApi } from "../../api/catalogs";
import { MdDelete } from "react-icons/md";
import Stores from "./PopUp/Stores";
import AllSongs from "./AllSongs";
import ConfirmationButton from "../../ui/ConfirmationButton";
import EditReleasePopUp from "./PopUp/EditReleasePopUp";
import { SiApplemusic } from "react-icons/si";

export default function AdminListRow({
    catalog,
    index,
    currentPage,
    PAGE_SIZE,
}: {
    catalog: any;
    index: any;
    currentPage: any;
    PAGE_SIZE: any;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    const { mutate: UpdateAdminCatalog } = UpdateAdminCatalogApi();

    const handleDownload = (link: any) => {
        const fileUrl = `https://api.fmdigitalofficial.com/${link}`;

        console.log(link.split("/")[1]);

        // Fetch the file
        fetch(fileUrl)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a Blob object and create a temporary anchor element
                const blobObject = new Blob([blob]);
                const downloadLink = document.createElement("a");

                // Set the href attribute to a URL created by the Blob
                downloadLink.href = URL.createObjectURL(blobObject);

                // Set the download attribute with a suggested filename
                downloadLink.download = link.split("/")[2];

                // Trigger a click on the anchor
                document.body.appendChild(downloadLink);
                downloadLink.click();

                // Remove the anchor from the DOM
                document.body.removeChild(downloadLink);
            })
            .catch((error) => {
                console.error("Download failed:", error);
            });
    };

    const handleUrlClick = (link: any) => {
        if (link) {
            window.open(link, "_blank");
        }
    };

    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <>
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="px-4 w-20 text-center py-2 bg-[#9dd3fc] text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none "
                            >
                                <span className="mr-2 text-white font-semibold">Draft</span>
                            </button>
                            <ConfirmationButton title={"Are you sure you want to delete ?"}>
                                <MdDelete color="red" size={20} />
                            </ConfirmationButton>
                        </div>
                    </>
                );
            case 1:
                return <>--</>;
            case 2:
                return <>--</>;
            case 3:
                return (
                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0000cd] w-20 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none"
                        >
                            <span className=" text-white text-xs font-semibold">
                                Correct..
                            </span>
                        </button>

                        <span className="cursor-pointer">
                            <MdDelete color="red" size={20} />
                        </span>
                    </div>
                );
            case 4:
                return (
                    <>
                        <Stores />
                    </>
                );
            default:
                return <></>;
        }
    };

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                    {catalog.ReleaseTitle || "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.users_id || "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {statusButton(catalog.Status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                    {catalog.userData[0]?.fname + " " + catalog.userData[0]?.lname ||
                        "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                    {catalog.userData[0]?.email || "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                    {catalog.LabelName || "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                    {catalog.songInfo?.length || "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                    {catalog.ReleaseDate ? catalog.ReleaseDate : "--"}
                </td>
                <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex justify-end cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <FaChevronUp className="text-gray-500" />
                    ) : (
                        <FaChevronDown className="text-gray-500" />
                    )}
                </td>
            </tr>

            {isOpen && (
                <tr className="w-full">
                    <td colSpan={8} className="px-0 py-0">
                        <div className="px-6 py-4 grid sm:grid-cols-3 gap-20">
                            {/* Your accordion content goes here */}
                            <div className="sm:col-span-1">
                                <div className="flex w-full justify-center items-center">
                                    {catalog.ImageDocument && (
                                        <img
                                            className="w-32 h-32 object-cover rounded"
                                            src={`https://api.fmdigitalofficial.com/${catalog.ImageDocument}`}
                                            alt="Art Work"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Release Type:</p>
                                    <p className="text-sm">{catalog?.ReleaseType}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Release Title:</p>
                                    <p className="text-sm">{catalog?.ReleaseTitle}</p>
                                </div>

                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold text-sm">Primary Artist:</p>
                                    <p className="text-sm">{catalog?.PrimaryArtist}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Apple Id:</p>
                                    {catalog?.primaryArtist?.length &&
                                        catalog?.primaryArtist[0]?.AppleId !== "" ? (
                                        <SiApplemusic
                                            className="cursor-pointer"
                                            size={14}
                                            onClick={() =>
                                                handleUrlClick(catalog?.primaryArtist[0]?.AppleId)
                                            }
                                        />
                                    ) : (
                                        "--"
                                    )}
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">Spotify Id:</p>
                                    {catalog?.primaryArtist?.length &&
                                        catalog?.primaryArtist[0]?.SpotifyId !== "" ? (
                                        <FaSpotify
                                            className="cursor-pointer"
                                            size={14}
                                            onClick={() =>
                                                handleUrlClick(catalog?.primaryArtist[0]?.SpotifyId)
                                            }
                                        />
                                    ) : (
                                        "--"
                                    )}
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">FeaturingArtist :</p>
                                    <p className="text-sm">{catalog?.FeaturingArtist}</p>
                                </div>
                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold text-sm">Genre:</p>
                                    <p className="text-sm">{catalog?.Genre}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Sub Genre:</p>
                                    <p className="text-sm">{catalog?.SubGenre}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">PLine:</p>
                                    <p className="text-sm">{catalog?.PLine}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">CLine:</p>
                                    <p className="text-sm">{catalog?.CLine}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">UPC/EAN:</p>
                                    <p className="text-sm">{catalog?.UPCEAN}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Cat No. :</p>
                                    <p className="text-sm">{catalog?.cat_id}</p>
                                </div>
                                <div className="w-full flex space-x-2 justify-end mt-2">
                                    <EditReleasePopUp
                                        id={catalog?.releseInfo_id}
                                        userId={catalog?.users_id}
                                    />
                                    <button
                                        onClick={() => handleDownload(catalog?.ImageDocument)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full cursor-pointer transition-all duration-300 text-sm"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>

                            <div className="h-[300px] w-full sm:col-span-2">
                                <AllSongs data={catalog} userId={catalog?.users_id} />
                            </div>
                        </div>
                    </td>
                </tr>
            )}

            <tr className="">
                <td colSpan={10}>
                    <div className="flex w-full justify-end gap-3 p-1">
                        <ConfirmationButton
                            onConfirm={() => {
                                UpdateAdminCatalog({
                                    users_id: catalog.users_id,
                                    releseInfo_id: catalog.releseInfo_id,
                                    Status: 4,
                                });
                            }}
                            title={"Are you sure you want to Approve Release ?"}
                        >
                            <button
                                type="button"
                                className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Approve Release
                            </button>
                        </ConfirmationButton>

                        <ConfirmationButton
                            onConfirm={() => {
                                UpdateAdminCatalog({
                                    users_id: catalog.users_id,
                                    releseInfo_id: catalog.releseInfo_id,
                                    Status: 3,
                                });
                            }}
                            title={"Are you sure you want to Reject Release ?"}
                        >
                            <button
                                type="button"
                                className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Reject Release
                            </button>
                        </ConfirmationButton>

                        <ConfirmationButton
                            onConfirm={() => {
                                UpdateAdminCatalog({
                                    users_id: catalog.users_id,
                                    releseInfo_id: catalog.releseInfo_id,
                                    Status: 2,
                                });
                            }}
                            title={"Are you sure you want to Take Down Release ?"}
                        >
                            <button
                                type="button"
                                className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Take Down Release
                            </button>
                        </ConfirmationButton>
                    </div>
                </td>
            </tr>
        </>
    );
}
