import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderOpen, MessageSquare, User, Code2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ import theme

const Sidebar = () => {
  const { isDark } = useTheme(); // ✅ use context
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/projects", icon: FolderOpen, label: "Projects" },
    { to: "/messages", icon: MessageSquare, label: "Messages" },
  ];

  return (
    <div
      className={`w-64 min-h-screen shadow-lg border-r transition-colors duration-200
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      {/* Logo & Title */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              ProjectHub
            </h1>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Arpit's Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? isDark
                      ? "bg-blue-900/20 text-blue-400 border-r-2 border-blue-600"
                      : "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : isDark
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom User Card */}
      <div className="absolute bottom-6 left-6 right-6 w-52">
        <div
          className={`p-4 rounded-lg border transition-colors duration-200 
            ${
              isDark
                ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
            }`}
        >
          <div className="flex items-center space-x-3">
            <User
              className={`h-8 w-8 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Arpit
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
