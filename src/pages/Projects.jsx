import React, { useState, useEffect } from "react";
import { Grid, List, Star } from "lucide-react";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectList from "../components/Projects/ProjectList";
import "../index.css";
import { useTheme } from "../contexts/ThemeContext";

const API_BASE = "https://arpit-s-dashboard-backend.onrender.com/api";

const Projects = ({ refreshProjects }) => {
  const [projects, setProjects] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // ✅ Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      let data = await res.json();
      // sort favorites on top
      data.sort((a, b) => (b.fav === a.fav ? 0 : b.fav ? 1 : -1));
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshProjects]);

  // ✅ Delete project + update state
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // ✅ Toggle fav + update state
  const toggleFav = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}/fav`, { method: "PATCH" });
      const updated = await res.json();
      setProjects((prev) =>
        prev
          .map((p) => (p._id === id ? updated : p))
          .sort((a, b) => (b.fav === a.fav ? 0 : b.fav ? 1 : -1))
      );
    } catch (err) {
      console.error("Error toggling fav:", err);
    }
  };

  // ✅ Update project locally without refetch
  const handleUpdate = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
    );
  };

  if (loading) {
    return <p className="text-center mt-4">Loading projects...</p>;
  }

  return (
    <div className="p-6 no-scrollbar">
      {/* Header row */}
      <div className="flex justify-between items-center mb-4 mt-6">
        <h2 className="text-xl font-semibold">My Projects</h2>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded ${
              viewMode === "card" ? "bg-gray-300" : "bg-gray-100"
            } ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setViewMode("card")}
          >
            <Grid size={20} />
          </button>
          <button
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-gray-300" : "bg-gray-100"
            } ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setViewMode("list")}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Projects display */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 no-scrollbar gap-4">
          {projects.map((project) => (
            <div key={project._id} className="relative">
              <ProjectCard
                project={project}
                onDelete={() => handleDelete(project._id)}
                onUpdate={handleUpdate}
              />
              <button
                onClick={() => toggleFav(project._id)}
                className="absolute top-2 right-2"
              >
                <Star
                  className={`w-6 h-6 ${
                    project.fav ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project._id} className="relative">
              <ProjectList
                project={project}
                onDelete={() => handleDelete(project._id)}
                onUpdate={handleUpdate}
              />
              <button
                onClick={() => toggleFav(project._id)}
                className="absolute top-2 right-2"
              >
                <Star
                  className={`w-6 h-6 ${
                    project.fav ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
