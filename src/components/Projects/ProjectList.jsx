import React from "react";
import { Star, ExternalLink, Edit, Trash2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ProjectList = ({ project }) => {
  const { isDark } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return isDark
          ? "bg-green-900/20 text-green-400"
          : "bg-green-100 text-green-800";
      case "active":
        return isDark
          ? "bg-blue-900/20 text-blue-400"
          : "bg-blue-100 text-blue-800";
      case "pending":
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
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className={`rounded-xl shadow-sm border overflow-hidden 
      ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className={`flex items-center gap-4 p-4 transition-colors ${isDark ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100 shadow-2xl'}`}>
        {/* Image */}
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-16 h-16 rounded-lg object-cover"
        />

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              {project.name}
            </h3>
            {/* <Star className={`h-4 w-4 ${getPriorityColor(project.priority)}`} /> */}
          </div>
          <p className={`text-sm line-clamp-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {project.description}
          </p>

          {/* Status + Progress */}
          <div className="flex items-center gap-4 mt-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
            <div className="flex items-center gap-2 w-40">
              <div className={`flex-1 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${project.progress || 0}%` }}
                ></div>
              </div>
              <span className={`text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {project.progress || 0}%
              </span>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mt-2">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded text-xs ${
                  isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span
                className={`px-2 py-1 rounded text-xs ${
                  isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}
              >
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          <button
            className={`transition-colors ${
              isDark
                ? "text-gray-400 hover:text-blue-400"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className={`transition-colors ${
              isDark
                ? "text-gray-400 hover:text-red-400"
                : "text-gray-400 hover:text-red-600"
            }`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <a
            href={project.url}
            className={`transition-colors ${
              isDark
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
