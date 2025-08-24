import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";  
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app-wrapper">
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />

              {/* Protected */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Projects />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Messages />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

//Developer: Arpit Shukla