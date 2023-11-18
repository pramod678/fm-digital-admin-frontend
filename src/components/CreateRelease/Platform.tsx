import * as React from "react";
import { GetReleaseInfoApi, GetSongsApi, ReleaseInfoPostApi, UserDataApi } from "../../api/releaseInfo";
import { Link, useNavigate } from "react-router-dom";
import { PlatformPostApi } from "../../api/platform";


export default function Platform() {

    const [userData, setUserData] = React.useState<any>("");
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const { mutate: PlatformPost, isLoading: isLoadingPlatformPost } = PlatformPostApi()
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)


    const { data: getReleaseInfo } = GetReleaseInfoApi(userData?.users_id)
    const { data: GetSongs } = GetSongsApi(getReleaseInfo?.data?.data?.releseInfo_id)


    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const data = [
        { name: "Adaptr" },
        { name: "Amazon" },
        { name: "Anghami" },
        { name: "Boomplay" },
        { name: "ClaroMúsica" },
        { name: "Deezer" },
        { name: "FM Digital Stores maximizer" },
        { name: "Flo" },
        { name: "Ganna" },
        { name: "Instagram & Facebook" },
        { name: "iTunes/Apple music" },
        { name: "iHeartRadio" },
        { name: "Joox" },
        { name: "Joox" },
        { name: "KKBox" },
        { name: "Kuack Media" },
        { name: "MediaNet & many smaller outlets" },
        { name: "NetEase" },
        { name: "Pandora" },
        { name: "Saavn" },
        { name: "Shazam" },
        { name: "Snapchat" },
        { name: "Soundcloud" },
        { name: "Spotify" },
        { name: "Tencent" },
        { name: "Tidal" },
        { name: "TikTok, Resso, Luna" },
        { name: "Wynk" },
        { name: "Yandex Music (beta)" },
        { name: "YouTube Music" },
    ];

    const data1 = [
        { name: "BSNL" },
        { name: "AIRTEL" },
        { name: "VI" },
    ];

    const data2 = [
        { name: "MX Player" },
        { name: "Hungama" },
        { name: "Amazon" },
        { name: "Tidal" },
        { name: "Apple music" },
        { name: "Boomplay" },
        { name: "VI" },
        { name: "Tencent" },
        { name: "Facebook PMV" },
        { name: "Vimeo" },
    ];

    const tabs = [
        { name: 'Release Info', route: 'ReleseInfo' },
        { name: 'Song Info', route: 'Songsinfo' },
        { name: 'Platform', route: 'Platform' },
        { name: 'Submission', route: 'Submission' },
    ]

    const handleSubmit = async (e: any) => {
        let formdata = {
            Audio: data,
            CRBT: data1,
            VideoPlatform: data2,
            users_id: parseInt(userData.users_id),
        }
        PlatformPost(formdata)
    };



    return (
        <>
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        <Link to={`/${r.route}`}>
                            <button
                                key={index}
                                type="button"
                                className={`text-left text-sm md:text-base pl-1 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${r?.name === "Platform" ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                            >
                                {r.name}
                            </button>
                        </Link>
                    ))}
                </div>

            </div>
            <div className="p-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg sm:text-2xl font-bold">Audio(190+)</h3>
                    <input type="checkbox" checked className="mr-2 w-6 h-6" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {
                        data?.map((item: any, index) => {
                            return (
                                <div key={index} className="flex items-center mb-4">
                                    <label className="cursor-pointer">
                                        <input type="checkbox" checked className="mr-2" />
                                        {item.name}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="p-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg sm:text-2xl font-bold">CRBT(3+)</h3>
                    <input
                        type="checkbox"
                        checked={GetSongs?.data?.data[0]?.CallerTuneTiming ? true : false}
                        className="mr-2 w-6 h-6"
                        readOnly
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {data1?.map((item: any, index) => {
                        return (
                            <div key={index} className="flex items-center mb-4">
                                <label className="cursor-pointer">
                                    <input type="checkbox" checked={GetSongs?.data?.data[0]?.CallerTuneTiming ? true : false} className="mr-2" />
                                    {item.name}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="p-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg sm:text-2xl font-bold">Video Platform(3+)</h3>
                    <input
                        type="checkbox"
                        checked={GetSongs?.data?.data[0]?.DistributeMusicvideo ? true : false}
                        className="mr-2 w-6 h-6"
                        readOnly
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {data2?.map((item: any, index) => {
                        return (
                            <div key={index} className="flex items-center mb-4">
                                <label className="cursor-pointer">
                                    <input type="checkbox" checked={GetSongs?.data?.data[0]?.DistributeMusicvideo ? true : false} className="mr-2" />
                                    {item.name}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>


            <div className="flex justify-end items-center p-4">
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
            </div>

        </>
    )
}