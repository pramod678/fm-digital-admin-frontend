import * as React from "react";
import AdminPrimaryArtistIndex from "./PrimaryArtist";
import AdminFeaturingArtistIndex from "./FeaturingArtist";




const AdminManageArtistIndex = () => {

    const [showPrimaryArtist, setShowPrimaryArtist] = React.useState(true)

    return (
        <>
            <div className="p-4">
                <div className="w-1/2 mb-4 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">{showPrimaryArtist ? 'Manage Primary Artist' : 'Manage Featuring Artist'}</p>
                </div>
                <div className="w-full flex justify-end">
                    <button
                        type="button"
                        className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs mb-2"
                        onClick={() => {
                            setShowPrimaryArtist((prev: any) => !prev)
                        }}
                    >
                        {showPrimaryArtist ? 'Go to Featuring Artist' : ' Go to Primary Artist'}
                    </button>
                </div>
                {
                    showPrimaryArtist ? (
                        <>
                            <AdminPrimaryArtistIndex />
                        </>
                    ) : (
                        <>
                                <AdminFeaturingArtistIndex showPrimaryArtist={showPrimaryArtist} />
                        </>
                    )
                }
            </div>
        </>
    )

}

export default AdminManageArtistIndex;