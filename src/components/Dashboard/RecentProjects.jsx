import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ use context

const API_BASE = "https://arpit-s-dashboard-backend.onrender.com/api"; // ✅ backend

const RecentProjects = () => {
  const [projects, setProjects] = useState([]);
  const { isDark } = useTheme();

  // Fetch only starred projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects`);
        let data = await res.json();

        // ✅ filter only starred
        const starred = data.filter((p) => p.fav === true);

        // show top 2 starred projects (you can increase if needed)
        setProjects(starred.slice(0, 2));
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return isDark
          ? "bg-green-900/20 text-green-400"
          : "bg-green-100 text-green-800";
      case "In Progress":
        return isDark
          ? "bg-blue-900/20 text-blue-400"
          : "bg-blue-100 text-blue-800";
      case "Planning":
        return isDark
          ? "bg-yellow-900/20 text-yellow-400"
          : "bg-yellow-100 text-yellow-800";
      default:
        return isDark
          ? "bg-gray-900/20 text-gray-400"
          : "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`rounded-xl shadow-sm border p-6 transition-colors duration-200 
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Recent Projects
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Your favorite projects at a glance
          </p>
        </div>
        <a
          href="/projects"
          className={`text-sm font-medium ${
            isDark
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          View All
        </a>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
            No starred projects yet ⭐
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200
                ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {project.name}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  <div
                    className={`flex items-center space-x-4 text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <span>{project.dueDate}</span>
                    <div className="flex items-center space-x-2 flex-wrap">
                      {project.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs 
                            ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <a
                  href={project.url}
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Progress
                    </span>
                    <span
                      className={`${
                        isDark ? "text-white" : "text-gray-900"
                      } font-medium`}
                    >
                      {project.progress}%
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-full h-2 ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentProjects;
