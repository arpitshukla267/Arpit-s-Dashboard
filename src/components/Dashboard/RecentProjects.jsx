import React, { useEffect, useState } from "react";
import { ExternalLink, Calendar, Star } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ use context

const RecentProjects = () => {
  const [projects, setProjects] = useState([]);
  const { isDark, toggleTheme } = useTheme(); // ✅ get theme + toggle

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = projects.slice(0, 2);


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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return isDark ? "text-red-400" : "text-red-600";
      case "Medium":
        return isDark ? "text-yellow-400" : "text-yellow-600";
      case "Low":
        return isDark ? "text-green-400" : "text-green-600";
      default:
        return isDark ? "text-gray-400" : "text-gray-600";
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
            Your latest project updates and progress
          </p>
        </div>
        {/* <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border transition 
            ${isDark
              ? "border-gray-600 hover:bg-gray-700 text-blue-400"
              : "border-gray-300 hover:bg-gray-100 text-yellow-500"}`}
        >
          {isDark ? "🌙" : "☀️"}
        </button> */}
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
            Loading projects...
          </p>
        ) : (
          displayedProjects.map((project) => (
            <div
              key={project.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200
                ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {project.name}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    {/* <Star className={`h-4 w-4 ${getPriorityColor(project.priority)}`} /> */}
                  </div>
                  <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  <div className={`flex items-center space-x-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    <div className="flex items-center space-x-1">
                      {/* <Calendar className="h-4 w-4" /> */}
                      <span>{project.dueDate}</span>
                    </div>
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
                <a href={project.url} className={`${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>
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
                    <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>
                      {project.progress}%
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
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
