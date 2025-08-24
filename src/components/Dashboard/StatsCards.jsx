import React, { useEffect, useState } from "react";
import { FolderOpen, MessageSquare, Eye, TrendingUp } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ import theme

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const { isDark } = useTheme(); // ✅ get dark mode state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <p className={isDark ? "text-gray-400" : "text-gray-500"}>
        Loading stats...
      </p>
    );
  }

const cards = [
  {
    title: "Total Projects",
    value: stats.totalProjects,
    change: `${stats.totalProjectsChange >= 0 ? "+" : ""}${stats.totalProjectsChange} this month`,
    icon: FolderOpen,
    color: "bg-blue-500",
  },
  {
    title: "Messages",
    value: stats.messages,
    change: `${stats.messagesChange >= 0 ? "+" : ""}${stats.messagesChange} this week`,
    icon: MessageSquare,
    color: "bg-green-500",
  },
  {
    title: "Portfolio Views",
    value: stats.portfolioViews,
    change: `${stats.portfolioViewsChange >= 0 ? "+" : ""}${stats.portfolioViewsChange} this month`,
    icon: Eye,
    color: "bg-purple-500",
  },
  {
    title: "Engagement Rate",
    value: stats.engagementRate,
    change: "Compared to last month", // could also calculate difference
    icon: TrendingUp,
    color: "bg-orange-500",
  },
];


  return (
    <>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200
            ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {card.title}
              </p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {card.value}
              </p>
              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                {card.change}
              </p>
            </div>
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatsCards;
