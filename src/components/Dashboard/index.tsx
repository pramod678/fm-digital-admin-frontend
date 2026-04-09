import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TabNavigation from "./TabNavigation";
import { GetUserDataApi } from "../../api/endpoint";
import useAuthStore from "../../store/userstore";
import { BounceLoader } from "react-spinners";
import cogoToast from "@successtar/cogo-toast";

import AccountOverview from "./tabs/AccountOverview";
import Achievements from "./tabs/Achievements";
import Subscription from "./tabs/Subscription";
import ReferFriend from "./tabs/ReferFriend";

const tabs = [
    { id: 'overview', label: 'Account Overview' },
    // { id: 'achievements', label: 'Achievements' },
    { id: 'subscription', label: 'Subscription' },
    // { id: 'refer', label: 'Refer a Friend' }
];

const DashboardPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    console.log("tab from url",tabFromUrl)
    const [activeTab, setActiveTab] = React.useState(tabFromUrl || 'overview');
    
    // Update active tab when URL changes
    // React.useEffect(() => {
    //     if (tabFromUrl) {
    //         setActiveTab(tabFromUrl);
    //     }
    // }, [tabFromUrl]);

    React.useEffect(() => {
       
    // If there's a tab in the URL, use it; otherwise default to 'overview'
    const validTab = (tabFromUrl && tabs.some(tab => tab.id === tabFromUrl)) ? tabFromUrl : 'overview';
    setActiveTab(validTab);
    console.log("ValidTab:",validTab)
    console.log("active tab:",activeTab)
    
    // If the URL doesn't have a tab parameter, set it to the active tab
    if (!tabFromUrl) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('tab', validTab);
        navigate(`?${newSearchParams.toString()}`, { replace: true });
    }
}, [tabFromUrl]); // Only run when tabFromUrl changes

    const [userData, setUserData] = React.useState<any>(null);
    const [checkedAchievements, setCheckedAchievements] = React.useState<Record<string, boolean>>({
        '1year': true,   // Default checked for 1 Year
        '3year': false,
        '5year': false,
        '7year': false,
        '10year': false,
        '5tracks': true,
        '15tracks': true,
        '50tracks': false,
        '100tracks': true
    });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { setUserType } = useAuthStore();
    
    // Commented out API calls to prevent CORS errors
    // const { data: getUserData, isLoading: isLoadinggetUserData } = GetUserDataApi(
    //     setUserData, 
    //     navigate, 
    //     setUserType, 
    //     token
    // );

    // React.useEffect(() => {
    //     if (getUserData?.data?.data) {
    //         setUserData(getUserData.data.data);
    //     }
    // }, [getUserData]);

    const isLoadinggetUserData: boolean = false; // Set to false to show UI

    const handleEditProfile = () => {
        if (userData?.users_id) {
            navigate(`/userDetails/${userData.users_id}`);
        } else {
            cogoToast.error("User data not available");
        }
    };

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Update URL without page reload
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('tab', tabId);
        navigate(`?${newSearchParams.toString()}`, { replace: true });
    };

    const handleUpgrade = () => {
        cogoToast.info("Upgrade feature coming soon!");
    };

    const handleManageSubscription = () => {
        cogoToast.info("Subscription management coming soon!");
    };

    const handleEditSocialMedia = () => {
        if (userData?.users_id) {
            navigate(`/userDetails/${userData.users_id}`);
        } else {
            cogoToast.error("User data not available");
        }
    };

    const toggleAchievement = (achievementId: string, isLocked: boolean = false) => {
        if (isLocked) return; // Don't toggle if the achievement is locked
        
        const newState = !checkedAchievements[achievementId];
        console.log(`Achievement ${achievementId} toggled to:`, newState);
        
        setCheckedAchievements(prev => ({
            ...prev,
            [achievementId]: newState
        }));
    };

    if (isLoadinggetUserData) {
        return (
            <div className="flex justify-center items-center h-64">
                <BounceLoader size={60} color={"#3B82F6"} />
            </div>
        );
    }

    // Stub/Default data
    const stubData = {
        profile: {
            fname: "Ashish",
            lname: "Rajput",
            email: "Ashish@gmail.com",
            phone: "+91 8512123456",
            address: {
                line: "D/931 -6 Raj Nagar",
                city: "Ghaziabad",
                state: "Uttar Pradesh",
                country: "India",
                pincode: "201102"
            }
        },
        socialMedia: {
            facebook: "",
            instagram: "",
            youtube: "",
            twitter: "",
            linkedin: ""
        },
        billing: {
            beneficiaryName: "Ashish Rajput",
            bankName: "State Bank of India",
            ibanAccount: "1234567890",
            ifscCode: "SBIN0001234",
            swiftCode: "SBININBB123"
        }
    };

    // Transform user data to match component props with fallback to stub data
    const profileData = {
        fname: userData?.fname || stubData.profile.fname,
        lname: userData?.lname || stubData.profile.lname,
        email: userData?.email || stubData.profile.email,
        phone: userData?.phoneNumber || stubData.profile.phone,
        address: {
            line: userData?.addressLine || stubData.profile.address.line,
            city: userData?.city || stubData.profile.address.city,
            state: userData?.state || stubData.profile.address.state,
            country: userData?.country || stubData.profile.address.country,
            pincode: userData?.postCode || stubData.profile.address.pincode
        }
    };

    const socialMediaData = {
        facebook: userData?.facebook || stubData.socialMedia.facebook,
        instagram: userData?.instagram || stubData.socialMedia.instagram,
        youtube: userData?.youtube || stubData.socialMedia.youtube,
        twitter: userData?.twitter || stubData.socialMedia.twitter,
        linkedin: userData?.linkedin || stubData.socialMedia.linkedin
    };

    const billingData = {
        beneficiaryName: userData?.beneficiaryName || stubData.billing.beneficiaryName,
        bankName: userData?.bankName || stubData.billing.bankName,
        ibanAccount: userData?.accountNumber || stubData.billing.ibanAccount,
        ifscCode: userData?.IFSCcode || stubData.billing.ifscCode,
        swiftCode: userData?.swiftcode || stubData.billing.swiftCode
    };

    

    return (
        <div className="">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-1">
                <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {activeTab === 'overview' && (
                <AccountOverview
                    userData={profileData}
                    socialMediaData={socialMediaData}
                    billingData={billingData}
                    onEditProfile={handleEditProfile}
                    onEditSocialMedia={handleEditSocialMedia}
                    onUpgrade={handleUpgrade}
                    onManageSubscription={handleManageSubscription}
                />
            )}

            {activeTab === 'achievements' && (
                <Achievements
                    checkedAchievements={checkedAchievements}
                    toggleAchievement={toggleAchievement}
                />
            )}

            {activeTab === 'subscription' && (
                <Subscription
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            )}

            {activeTab === 'refer' && (
                <ReferFriend
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            )}
        </div>
    );
};

export default DashboardPage;