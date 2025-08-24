import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ useTheme hook

const UserInteractionChart = () => {
  const { isDark } = useTheme(); // ✅ detect theme

  // Static sample data (frontend only)
  const [data] = useState([
    { date: "Aug 1", views: 120, interactions: 50, messages: 10 },
    { date: "Aug 2", views: 90, interactions: 30, messages: 7 },
    { date: "Aug 3", views: 140, interactions: 60, messages: 12 },
    { date: "Aug 4", views: 110, interactions: 45, messages: 9 },
    { date: "Aug 5", views: 160, interactions: 70, messages: 15 },
  ]);

  return (
    <div
      className={`rounded-xl shadow-sm border p-6 pt-14 transition-colors duration-200
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            User Interactions
          </h3>
          <p
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Portfolio views and engagement over time
          </p>
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
              Views
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
              Interactions
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
              Messages
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#E5E7EB"} // ✅ custom grid color
            />
            <XAxis
              dataKey="date"
              stroke={isDark ? "#9CA3AF" : "#4B5563"} // ✅ axis text color
              fontSize={12}
            />
            <YAxis
              stroke={isDark ? "#9CA3AF" : "#4B5563"}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark
                  ? "rgba(31, 41, 55, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                color: isDark ? "#E5E7EB" : "#111827",
              }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorViews)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="interactions"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorInteractions)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="messages"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserInteractionChart;
