import React, { useState } from "react";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const API_BASE = "https://arpit-s-dashboard-backend.onrender.com/api";

const ProjectList = ({ project, onDelete, onUpdate }) => {
  const { isDark } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: project.name || "",
    description: project.description || "",
    progress: project.progress || 0,
    technologies: project.technologies?.join(", ") || "",
    imageUrl: project.imageUrl || "",
    url: project.url || "",
    status: project.status || "pending",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return isDark
          ? "bg-green-900/20 text-green-400"
          : "bg-green-100 text-green-800";
      case "active":
        return isDark ? "bg-blue-900/20 text-blue-400" : "bg-blue-100 text-blue-800";
      case "pending":
        return isDark
          ? "bg-yellow-900/20 text-yellow-400"
          : "bg-yellow-100 text-yellow-800";
      default:
        return isDark ? "bg-gray-900/20 text-gray-400" : "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/projects/${project._id}`, {
        method: "DELETE",
      });
      if (res.ok && onDelete) onDelete(project._id);
    } catch (err) {
      console.error("❌ Error deleting project:", err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(",").map((t) => t.trim()),
        }),
      });
      if (res.ok) {
        const updatedProject = await res.json();
        if (onUpdate) onUpdate(updatedProject);
        setShowEditModal(false);
      }
    } catch (err) {
      console.error("❌ Error updating project:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`rounded-xl shadow-sm border overflow-hidden ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`flex items-center gap-4 p-4 transition-colors ${
            isDark ? "hover:bg-gray-700/60" : "hover:bg-gray-100 shadow-2xl"
          }`}
        >
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
                <div className={`flex-1 rounded-full h-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
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
              onClick={() => setShowEditModal(true)}
              className={`transition-colors ${
                isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-400 hover:text-blue-600"
              }`}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className={`transition-colors ${
                isDark ? "text-gray-400 hover:text-red-400" : "text-gray-400 hover:text-red-600"
              }`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${
                isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div
            className={`p-6 rounded-xl shadow-xl w-96 ${
              isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Delete Project?</h2>
            <p className="mb-6 text-sm text-gray-400">
              Are you sure you want to delete <span className="font-semibold">{project.name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div
            className={`relative w-[50vw] rounded-xl shadow-xl bg-slate-800 text-slate-200 p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto`}
          >
            <h2 className="text-xl font-semibold">Edit Project</h2>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              {/* Status */}
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
              >
                <option value="pending">⏳ Pending</option>
                <option value="active">🚀 Active</option>
                <option value="completed">✅ Completed</option>
              </select>

              {/* Project Name */}
              <input
                type="text"
                placeholder="Project Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
              />

              {/* Description */}
              <textarea
                placeholder="Project Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded resize-none"
                rows={4}
              />

              {/* Progress */}
              <input
                type="number"
                placeholder="Progress (%)"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
              />

              {/* Technologies */}
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
              />

              {/* Image URL */}
              <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
              />

              {/* Project URL */}
              <input
                type="text"
                placeholder="Project URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;
