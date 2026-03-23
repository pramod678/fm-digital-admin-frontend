import * as React from "react";
import AdminPrimaryArtistIndex from "./PrimaryArtist";
import AdminFeaturingArtistIndex from "./FeaturingArtist";




const AdminManageArtistIndex = () => {

    const [showPrimaryArtist, setShowPrimaryArtist] = React.useState(true)

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {
                    showPrimaryArtist ? (
                        <AdminPrimaryArtistIndex setShowPrimaryArtist={setShowPrimaryArtist} />
                    ) : (
                        <AdminFeaturingArtistIndex setShowPrimaryArtist={setShowPrimaryArtist} showPrimaryArtist={showPrimaryArtist} />
                    )
                }
            </div>
        </>
    )

}

export default AdminManageArtistIndex;