import * as React from "react";
import { ReleaseInfoPostApi, UserDataApi } from "../../api/releaseInfo";
import { Link, useNavigate } from "react-router-dom";
import { PlatformPostApi } from "../../api/platform";


export default function Platform() {

    const [userData, setUserData] = React.useState<any>("");
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const { mutate: PlatformPost, isLoading: isLoadingPlatformPost } = PlatformPostApi()
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const data = [
        [
            { name: "Adaptr", imgSrc: "images/adaptr.png" },
            { name: "Amazon", imgSrc: "images/amazon.jpg" },
            { name: "Anghami", imgSrc: "images/anghami.png" },
            { name: "Boomplay", imgSrc: "images/boomplay.png" },
            { name: "ClaroMúsica", imgSrc: "images/claromusica.png" },
            { name: "Deezer", imgSrc: "images/deezer.png" },
            { name: "FM Digital Stor maximizer", imgSrc: "images/fmdigitalstoremaximizer.png" },
            { name: "Flo", imgSrc: "images/flo.png" },
            { name: "Ganna", imgSrc: "images/ganna.png" },
            { name: "Instagram & Facebook", imgSrc: "images/instagramfacebook.jpg" },
        ],
        [
            { name: "iTunes/Apple music", imgSrc: "images/itunesapplemusic.png" },
            { name: "iHeartRadio", imgSrc: "images/iheartradio.png" },
            { name: "Joox", imgSrc: "images/joox.png" },
            { name: "Joox", imgSrc: "images/joox.png" },
            { name: "KKBox", imgSrc: "images/kkbox.png" },
            { name: "Kuack Media", imgSrc: "images/kuackmedia.png" },
            { name: "MediaNet & many smaller outlets", imgSrc: "images/medianetmanysmalleroutlets.png" },
            { name: "NetEase", imgSrc: "images/netease.jpg" },
            { name: "Pandora", imgSrc: "images/pandora.jpg" },
            { name: "Saavn", imgSrc: "images/saavn.png" },
        ],
        [
            { name: "Shazam", imgSrc: "images/shazam.png" },
            { name: "Snapchat", imgSrc: "images/snapchat.jpg" },
            { name: "Soundcloud", imgSrc: "images/soundcloud.png" },
            { name: "Spotify", imgSrc: "images/spotify.png" },
            { name: "Tencent", imgSrc: "images/tencent.png" },
            { name: "Tidal", imgSrc: "images/tidal.png" },
            { name: "TikTok, Resso, Luna", imgSrc: "images/tiktokressoluna.png" },
            { name: "Wynk", imgSrc: "images/wynk.png" },
            { name: "Yandex Music (beta)", imgSrc: "images/yandexmusicbeta.png" },
            { name: "YouTube Music", imgSrc: "images/youtubemusic.png" },
        ],
    ];

    const data1 = [
        [
            { name: "BSNL", imgSrc: "images/bsnl.png" },
            { name: "AIRTEL", imgSrc: "images/airtel.png" },
            { name: "VI", imgSrc: "images/vi.png" },
        ],
    ];

    const data2 = [
        [
            { name: "MX Player", imgSrc: "images/mxplayer.png" },
            { name: "HungamA", imgSrc: "images/hungama.png" },
            { name: "Amazon", imgSrc: "images/amazon.jpg" },
            { name: "Tidal", imgSrc: "images/tidal.png" },
            { name: "Apple music", imgSrc: "images/apple.png" },
        ],
        [
            { name: "Boomplay", imgSrc: "images/boomplay.png" },
            { name: "VI", imgSrc: "images/vi.png" },
            { name: "Tencent", imgSrc: "images/tencent.png" },
            { name: "Facebook PMV", imgSrc: "images/facebook.png" },
            { name: "Vimeo", imgSrc: "images/vimeo.png" },
        ],
    ];

    const tabs = [
        { name: 'Release Info', route: 'ReleseInfo' },
        { name: 'Song Info', route: 'Songsinfo' },
        { name: 'Platform', route: 'Platform' },
        { name: 'Submission', route: 'Submission' },
    ]

    const handleSubmit = async (e:any) => {
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
                <div className="flex flex-wrap md:flex-no-wrap justify-between p-6">
                    {data.map((column, columnIndex) => (
                        <div key={columnIndex} className=" mb-4">
                            {column.map((item, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    <img src={item.imgSrc} alt={item.name} className="w-16 h-16 mb-4 mr-4" />
                                    <label className="cursor-pointer">
                                        <input type="checkbox" checked className="mr-2" />
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg sm:text-2xl font-bold">CRBT(3+)</h3>
                    <input type="checkbox" checked className="mr-2 w-6 h-6" />
                </div>
                <table className="table-auto">
                    <tbody>
                        {data1.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((item, columnIndex) => (
                                    <td key={columnIndex} className="px-4 py-2">
                                        <div className="flex items-center">
                                            <img src={item.imgSrc} alt={item.name} className="w-16 h-16 mb-4 mr-4" />
                                            <label className="cursor-pointer">
                                                <input type="checkbox"  checked className="mr-2" />
                                                {item.name}
                                            </label>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-10">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg sm:text-2xl font-bold">Video Platform(3+)</h3>
                    <input type="checkbox" checked className="mr-2 w-6 h-6" />
                </div>
                <table className="table-auto">
                    <tbody>
                        {data2.map((row, rowIndex) => (
                            <tr key={rowIndex} className="mb-4">
                                {row.map((item, columnIndex) => (
                                    <td key={columnIndex} className="px-4 py-2 mr-4">
                                        <div className="flex items-center">
                                            <img src={item.imgSrc} alt={item.name} className="w-16 h-16 mr-2" />
                                            <label className="cursor-pointer">
                                                <input type="checkbox" checked className="mr-2" />
                                                {item.name}
                                            </label>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end items-center p-4">
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
            </div>

        </>
    )
}