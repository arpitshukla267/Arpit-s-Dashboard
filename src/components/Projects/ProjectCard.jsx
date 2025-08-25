import React, { useState } from 'react';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import "../../index.css";

const API_BASE = "https://arpit-s-dashboard-backend.onrender.com/api"; // ✅ backend URL

const ProjectCard = ({ project, onDelete }) => {
  const { isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return isDark
          ? 'bg-green-900/20 text-green-400'
          : 'bg-green-100 text-green-800';
      case 'active':
        return isDark
          ? 'bg-blue-900/20 text-blue-400'
          : 'bg-blue-100 text-blue-800';
      case 'pending':
        return isDark
          ? 'bg-yellow-900/20 text-yellow-400'
          : 'bg-yellow-100 text-yellow-800';
      default:
        return isDark
          ? 'bg-gray-900/20 text-gray-400'
          : 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/projects/${project._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        if (onDelete) onDelete(project._id); // ✅ remove from UI
      } else {
        console.error("❌ Failed to delete project");
      }
    } catch (err) {
      console.error("❌ Error deleting project:", err);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const technologies = project.technologies || [];

  return (
    <>
      <div
        className={`rounded-xl shadow-sm border no-scrollbar overflow-hidden hover:shadow-lg transition-shadow duration-200
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="relative">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status || "unknown"}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`text-lg font-semibold line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {project.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <button className={`transition-colors ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}>
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className={`transition-colors ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <a href={project.url} target="_blank" rel="noreferrer"
                 className={`transition-colors ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {project.progress || 0}%
              </span>
            </div>
            <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                +{technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className={`p-6 rounded-xl shadow-xl w-96 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-semibold mb-4">Delete Project?</h2>
            <p className="mb-6 text-sm text-gray-400">
              Are you sure you want to delete <span className="font-semibold">{project.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
