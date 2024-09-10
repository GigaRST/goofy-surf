import React, { useState, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  children: ReactNode;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  value?: string;
  defaultTab?: string;
  onTabChange?: (selectedTab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  defaultTab,
  onTabChange,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    value || defaultTab || tabs[0].id
  );

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            className={`tab tab-lifted text-2xl ${
              selectedTab === tab.id
                ? "tab-active text-white text-3xl font-semibold"
                : ""
            } ${tab.icon && "flex items-center gap-x-2"}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            {tab.icon && tab.icon}
          </a>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="mt-10">
        {tabs.map((tab) =>
          selectedTab === tab.id ? <div key={tab.id}>{tab.children}</div> : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
