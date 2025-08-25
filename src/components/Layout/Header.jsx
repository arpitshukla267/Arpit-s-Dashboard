import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { LogOut, Sun, Moon, Bell, Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://arpit-s-dashboard-backend.onrender.com/api"; // ✅ use deployed backend

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const options = [
    { value: "pending", label: "⏳ Pending" },
    { value: "in-progress", label: "🚀 In Progress" },
    { value: "completed", label: "✅ Completed" },
  ];

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectName || !description) {
      alert("Please fill out the required fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          name: projectName,
          description,
          progress,
          technologies: tags.split(",").map((t) => t.trim()),
          imageUrl,
          url,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to save project");

      console.log("✅ Project saved:", data.project);

      // Reset fields
      setIsModalOpen(false);
      setStatus("pending");
      setProjectName("");
      setDescription("");
      setProgress("");
      setTags("");
      setImageUrl("");
      setUrl("");
    } catch (error) {
      console.error("❌ Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  return (
    <>
      {/* Header */}
      <header
        className={`shadow-sm border-b px-6 py-4 transition-colors duration-300 ${
          isDark
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome back, {user?.name}!
            </h2>
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Here's what's happening with your projects today.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              className={`relative p-2 transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Add Project */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className={`flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                isDark
                  ? "text-gray-300 hover:text-red-400"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className={`p-6 rounded-lg shadow-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh] transition-colors ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Add New Project
                </h2>

                {/* Status Dropdown */}
                <div className="relative w-full mb-3">
                  <div
                    onClick={() => setOpen(!open)}
                    className={`w-full px-4 py-2 border rounded-lg shadow-sm flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isDark
                        ? "bg-gray-800 text-gray-200 border-gray-600 hover:border-indigo-300"
                        : "bg-white text-gray-800 border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    <span>{options.find((opt) => opt.value === status)?.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`absolute left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out border rounded-lg shadow-md ${
                      isDark
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-300"
                    } ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {options.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setStatus(opt.value);
                          setOpen(false);
                        }}
                        className={`px-4 py-2 cursor-pointer ${
                          isDark
                            ? "hover:bg-indigo-600"
                            : "hover:bg-indigo-50"
                        }`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Inputs */}
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className={`w-full mb-3 px-3 py-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />

                <textarea
                  placeholder="Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={`w-full mb-3 px-3 py-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />

                <input
                  type="number"
                  placeholder="Progress (%)"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  min={0}
                  max={100}
                  className={`w-full mb-3 px-3 py-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />

                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className={`w-full mb-3 px-3 py-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />

                <input
                  type="url"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={`w-full mb-4 px-3 py-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />

                <input
                  type="url"
                  placeholder="Project URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={`w-full mb-4 px-3 py-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2 transition-colors ${
                      isDark
                        ? "text-gray-300 hover:text-red-400"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProject}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
