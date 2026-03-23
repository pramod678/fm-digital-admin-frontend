import * as React from "react";

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {

    // Log when the component renders
    console.log('TabNavigation rendered with active tab:', activeTab);
    console.log("tabs:",tabs)
    
 
    return (
        <div className="border-b border-green-200 bg-white">
            <nav className="-mb-px flex overflow-x-auto px-2 md:px-6 md:divide-x md:divide-green-200" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            whitespace-nowrap py-2 px-4 md:py-3 md:px-6 border-b-2 font-bold text-base md:text-lg transition-colors duration-200
                            font-['Poppins']
                            ${activeTab === tab.id
                                ? 'border-green-500 text-black hover:text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={`
                                ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium
                                ${activeTab === tab.id
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-900'
                                }
                            `}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default TabNavigation;


