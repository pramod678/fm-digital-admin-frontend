import * as React from "react";
import { GetPlatformApi, GetReleaseInfoApi, GetReleaseInfoByIdApi, GetSongsApi, ReleaseInfoPostApi, UserDataApi } from "../../api/releaseInfo";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlatformPostApi, UpdatePlatformApi } from "../../api/platform";


export default function EditPlatform() {

    const [userData, setUserData] = React.useState<any>("");
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const { id } = useParams()
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    const { data: getReleaseInfo, isLoading, isFetching } = GetReleaseInfoByIdApi(id)
    const { data: getPlatfOrm } = GetPlatformApi(getReleaseInfo?.data?.data?.releseInfo_id)
    const { data: GetSongs } = GetSongsApi(getReleaseInfo?.data?.data?.releseInfo_id)

    const { mutate: UpdatePlatform, isLoading: isLoadingUpdatePlatform } = UpdatePlatformApi({ navigate, id: getPlatfOrm?.data?.data[0]?.platform_id, releaseId: getReleaseInfo?.data?.data?.releseInfo_id })

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
        { name: 'Release Info', route: `/ReleseInfoUpdate/${id}` },
        { name: 'Song Info', route: `/Songsinfo/${id}` },
        { name: 'Platform', route: `/Platform/${id}` },
        { name: 'Submission', route: `/Submission/${id}` },
    ]

    const handleSubmit = async (e: any) => {
        let formdata = {
            Audio: data,
            CRBT: data1,
            VideoPlatform: data2,
            releseInfo_id: getReleaseInfo?.data?.data?.releseInfo_id,
            users_id: parseInt(userData.users_id),
        }
        UpdatePlatform(formdata)
    };



    return (
        <>
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        // <Link to={`${r.route}`}>
                        <button
                            key={index}
                            type="button"
                            className={`text-left text-sm md:text-base pl-1 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${r?.name === "Platform" ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                            onClick={() => navigate(`${r.route}`)}
                        >
                            {r.name}
                        </button>
                        // </Link>
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
                    Update
                </button>
            </div>

        </>
    )
}