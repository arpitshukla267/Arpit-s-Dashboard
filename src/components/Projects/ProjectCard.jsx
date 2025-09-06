import React, { useState } from 'react';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import "../../index.css";

const API_BASE = "https://arpit-s-dashboard-backend.onrender.com/api";

const ProjectCard = ({ project, onDelete, onUpdate }) => {
  const { isDark } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: project.name || '',
    description: project.description || '',
    progress: project.progress || 0,
    technologies: project.technologies?.join(', ') || '',
    imageUrl: project.imageUrl || '',
    url: project.url || '',
    status: project.status || 'pending'
  });

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/projects/${project._id}`, { method: "DELETE" });
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(',').map(t => t.trim())
        })
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

  const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalContent = {
    hidden: { opacity: 0, scale: 0.95, height: 0 },
    visible: { opacity: 1, scale: 1, height: 'auto' },
    exit: { opacity: 0, scale: 0.95, height: 0 }
  };

  return (
    <>
      {/* Project Card */}
      <div className={`rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="relative">
          <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-800' : project.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {project.status || "unknown"}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold line-clamp-1`}>{project.name}</h3>
            <div className="flex items-center space-x-1 ml-2">
              <button onClick={() => setShowEditModal(true)} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}>
                <Edit className="h-4 w-4" />
              </button>
              <button onClick={() => setShowDeleteModal(true)} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}>
                <Trash2 className="h-4 w-4" />
              </button>
              <a href={project.url} target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>{project.description}</p>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.progress || 0}%</span>
            </div>
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-full h-2 rounded-full`}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${project.progress || 0}%` }}></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech, index) => (
              <span key={index} className={`${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} px-2 py-1 rounded text-xs`}>{tech}</span>
            ))}
            {project.technologies?.length > 3 && (
              <span className={`${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} px-2 py-1 rounded text-xs`}>
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="absolute inset-0 bg-black/50"
              variants={modalBackdrop}
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              className={`relative z-10 p-6 rounded-xl shadow-xl w-96 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Delete Project?</h2>
              <p className="mb-6 text-sm text-gray-400">Are you sure you want to delete <span className="font-semibold">{project.name}</span>? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 hover:cursor-pointer">Cancel</button>
                <button onClick={handleDelete} disabled={loading} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">{loading ? "Deleting..." : "Delete"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowEditModal(false)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              variants={modalBackdrop}
              onClick={() => setShowEditModal(false)}
            />
      
            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-[50vw] rounded-xl shadow-xl bg-slate-800 text-slate-200"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold">Add New Project</h2>
      
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                  {/* Status */}
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
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
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
                  />
      
                  {/* Project Description */}
                  <textarea
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded resize-none"
                    rows={4}
                  />
      
                  {/* Progress */}
                  <input
                    type="number"
                    placeholder="Progress (%)"
                    value={formData.progress}
                    onChange={e => setFormData({ ...formData, progress: e.target.value })}
                    className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
                  />
      
                  {/* Tags */}
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={formData.technologies}
                    onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
                  />
      
                  {/* Image URL */}
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-slate-700 text-slate-200 px-4 py-3 rounded"
                  />
      
                  {/* Project URL */}
                  <input
                    type="text"
                    placeholder="Project URL"
                    value={formData.url}
                    onChange={e => setFormData({ ...formData, url: e.target.value })}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
