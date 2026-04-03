import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ManageWorks from "./ManageWorks";
import ManageServices from "./ManageServices";
import ManageTestimonials from "./ManageTestimonials";
import LeadsManager from "./LeadsManager";
import axios from "axios";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("works");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/harry-admin-dashboard");
      return;
    }

    axios
      .get("/api/admin/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/harry-admin-dashboard");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/harry-admin-dashboard");
  };

  const tabs = [
    { id: "works", label: "Manage Works", icon: "🎬" },
    { id: "services", label: "Manage Services", icon: "⚙️" },
    { id: "testimonials", label: "Manage Testimonials", icon: "⭐" },
    { id: "leads", label: "Leads Management", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-darker to-dark">
      <div className="glass border-b border-gray-800 sticky top-0 z-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition"
            >
              Logout
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {activeTab === "works" && <ManageWorks />}
        {activeTab === "services" && <ManageServices />}
        {activeTab === "testimonials" && <ManageTestimonials />}
        {activeTab === "leads" && <LeadsManager />}
      </div>
    </div>
  );
};

export default AdminLayout;
