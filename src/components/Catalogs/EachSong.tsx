import * as React from "react";
import EditSongDetails from "../CreateRelease/PopUps/EditSongDetails";
import { GetReleaseInfoApi, UserDataApi } from "../../api/releaseInfo";
import { useNavigate } from "react-router-dom";



export default function EachSong({ index, data, userId }: { index: any, data: any, userId: any }) {

    const [activeIndex, setActiveIndex] = React.useState(null);

    const toggleAccordion = (index: any) => {
        setActiveIndex((prevIndex: any) => (prevIndex === index ? null : index));
    };


    const { data: getReleaseInfo } = GetReleaseInfoApi(userId)

    let Usersdata = {
        users_id: userId
    }



    const handleDownload = (link: any) => {
        const fileUrl = `https://api.fmdigitalofficial.com${link}`;

        console.log(link.split("/")[2])

        // Fetch the file
        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create a Blob object and create a temporary anchor element
                const blobObject = new Blob([blob]);
                const downloadLink = document.createElement('a');

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
            .catch(error => {
                console.error('Download failed:', error);
            });
    };

    return (
        <>
            <div key={index} className="border rounded mb-2 overflow-hidden">
                <div
                    className="flex items-center justify-between p-4 cursor-pointer transition-colors duration-300 ease-in-out bg-gray-200 hover:bg-gray-300"
                    onClick={() => toggleAccordion(index)}
                >
                    <div className="font-semibold">{data.Title}</div>
                    <div className="text-gray-600">
                        {activeIndex === index ? '▲' : '▼'}
                    </div>
                </div>
                {
                    activeIndex === index &&
                    <div
                        className={`p-2 border-t transition-max-height duration-300 ease-in-out `}
                    >
                        <div className="w-full flex justify-end mt-2">
                            {/* <EditSongDetails userData={Usersdata} song={data} getReleaseInfo={getReleaseInfo} /> */}
                            <audio controls className="outline-none ml-2 h-8 w-full md:w-64">
                                <source src={`https://api.fmdigitalofficial.com/${data.AudioDocument}`} />
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                        <div className="px-6 py-4 grid sm:grid-cols-2 gap-20">
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Track Version</p>
                                    <p className="text-sm">{data?.Trackversion}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Instrumental:</p>
                                    <p className="text-sm">{data?.Instrumental}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Song Title:</p>
                                    <p className="text-sm">{data?.Title}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Version/SubTitle:</p>
                                    <p className="text-sm">{data?.VersionSubtitle}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Primary Artist:</p>
                                    <p className="text-sm">{data?.Primaryartist}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Featuring Artist:</p>
                                    <p className="text-sm">{data?.FeaturingArtist}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Author:</p>
                                    <p className="text-sm">{data?.Author}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Composer:</p>
                                    <p className="text-sm">{data?.Composer}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Producer:</p>
                                    <p className="text-sm">{data?.Producer}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Publisher:</p>
                                    <p className="text-sm">{data?.Publisher}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">ISRC:</p>
                                    <p className="text-sm">{data?.ISRC}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Genre:</p>
                                    <p className="text-sm">{data?.Genre}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Sub Genre:</p>
                                    <p className="text-sm">{data?.Subgenre}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Price Tier:</p>
                                    <p className="text-sm">{data?.PriceTier}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Explicit Version:</p>
                                    <p className="text-sm">{data?.ExplicitVersion}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Track Title Language:</p>
                                    <p className="text-sm">{data?.TrackTitleLanguage}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Lyrics Language:</p>
                                    <p className="text-sm">{data?.LyricsLanguage}</p>
                                </div>
                                <div className="flex flex-col mb-1">
                                    <p className="font-semibold text-sm mb-1">Lyrics:</p>
                                    <div className=" h-32 border-2 border-black p-1 text-sm overflow-y-auto">
                                        <p className="whitespace-normal break-all">
                                            {data?.Lyrics}

                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Caller Tune Timing:</p>
                                    <p className="text-sm">{data?.CallerTuneTiming}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Distribute Music Video:</p>
                                    <p className="text-sm">{data?.DistributeMusicvideo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
