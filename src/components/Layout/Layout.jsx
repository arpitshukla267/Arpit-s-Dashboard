import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../../contexts/ThemeContext";

const Layout = ({ children }) => {
  const { isDark } = useTheme();

  // ✅ shared refresh state
  const [refreshProjects, setRefreshProjects] = useState(false);

  // ✅ function to trigger refresh
  const handleProjectAdded = () => {
    setRefreshProjects(prev => !prev);
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ pass trigger to Header */}
        <Header onProjectAdded={handleProjectAdded} />

        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto p-6 transition-colors no-scrollbar duration-300 ${
            isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
          }`}
        >
          {/* ✅ clone children to inject refreshProjects */}
          {React.cloneElement(children, { refreshProjects })}
        </main>
      </div>
    </div>
  );
};

export default Layout;
