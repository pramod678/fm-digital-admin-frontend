import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CreateReleaseTabsProps {
    activeTab: "Release Info" | "Song Info" | "Platform" | "Submission";
}

export default function CreateReleaseTabs({ activeTab }: CreateReleaseTabsProps) {
    const navigate = useNavigate();

    const tabs = [
        { name: 'Release Info', route: 'ReleaseInfo/AudioRelease' },
        { name: 'Song Info', route: 'ReleaseInfo/Songsinfo' },
        { name: 'Platform', route: 'ReleaseInfo/Platform' },
        { name: 'Submission', route: 'ReleaseInfo/Submission' },
    ];

    return (
        <div className="border-b border-gray-200 bg-gray-50 px-8 pt-4 w-full">
            <div className="flex gap-8 max-w-7xl mx-auto">
            {tabs.map((r, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => navigate(`/${r.route}`)}
                    className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                        r.name === activeTab
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                {r.name}
                </button>
            ))}
            </div>
        </div>
    );
}
