import * as React from "react";
import ReleaseInfo from "./ReleaseInfo";

export default function CreateReleasePage() {
    const data = new Date();
    const dayOfWeek = data.getDay();

    // Check if it's Saturday (6) or Sunday (0)
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;

    return (
        <>
            {isWeekend ? (
                <div className="flex flex-col h-[80vh] w-full items-center justify-center p-10">
                    {
                        dayOfWeek === 6 && (
                            <>
                                <p className="text-xl font-semibold mb-2">Out of Office Notice! Please note that our office is closed during the weekends, and as a result.
                                </p>
                                <p className="text-xl font-semibold mb-2"> We are unable to distribute releases during this time. Kindly submit your releases on Monday, the beginning of the next work week.</p>
                                <p className="text-lg font-semibold mb-2">Thank you, Team FM Digital.</p>
                            </>
                        )
                    }
                    {
                        dayOfWeek === 0 && (
                            <>
                                <p className="text-xl font-semibold mb-2">Good job, You broke the Internet! Just kidding.
                                    <p className="text-xl font-semibold mb-2">We’re backing up the server at the moment. The site should be back online before monday - 12:00 AM IST.</p>
                                </p>
                                <p className="text-lg font-semibold mb-2">Thank you, Team FM Digital.</p>
                            </>
                        )
                    }
                </div>
            ) : (
                <>
                    <ReleaseInfo />
                </>
            )}
        </>
    );
}
