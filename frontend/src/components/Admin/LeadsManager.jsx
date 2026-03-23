import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const LeadsManager = () => {
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState({
    price: "",
    deadline: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.get("/api/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(res.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  const getFilteredLeads = () => {
    if (activeTab === "new")
      return leads.filter((lead) => lead.status === "new");
    if (activeTab === "contact")
      return leads.filter((lead) => lead.status === "contact");
    if (activeTab === "converted")
      return leads.filter((lead) => lead.status === "converted");
    return leads;
  };

  const handleApprove = async (lead) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `/api/leads/${lead._id}`,
        { status: "contact" },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchLeads();
    } catch (err) {
      console.error("Error approving lead:", err);
    }
  };

  const handleReject = async (leadId) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/leads/${leadId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeads();
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const handleSuccess = async (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const submitSuccess = async () => {
    if (
      !successData.price ||
      !successData.deadline ||
      !successData.description
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `/api/leads/${selectedLead._id}`,
        {
          status: "converted",
          finalPrice: successData.price,
          deadline: successData.deadline,
          projectDescription: successData.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setModalOpen(false);
      setSuccessData({ price: "", deadline: "", description: "" });
      fetchLeads();
    } catch (err) {
      console.error("Error updating lead:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditConverted = async (lead, field, value) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `/api/leads/${lead._id}`,
        {
          [field]: value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchLeads();
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  const renderLeadCard = (lead) => {
    return (
      <div key={lead._id} className="glass rounded-xl p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{lead.name}</h3>
            <p className="text-gray-400">{lead.mobileNumber}</p>
          </div>
          <div className="text-sm text-gray-400">
            {new Date(lead.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p>
            <strong>Service:</strong> {lead.serviceName}
          </p>
          {lead.channelName && (
            <p>
              <strong>Channel:</strong> {lead.channelName}
            </p>
          )}
          {lead.channelLink && (
            <p>
              <strong>Link:</strong>{" "}
              <a
                href={lead.channelLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {lead.channelLink}
              </a>
            </p>
          )}
          <p>
            <strong>Message:</strong> {lead.message}
          </p>
          {lead.finalPrice && (
            <p>
              <strong>Price:</strong> ${lead.finalPrice}
            </p>
          )}
          {lead.deadline && (
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(lead.deadline).toLocaleDateString()}
            </p>
          )}
          {lead.projectDescription && (
            <p>
              <strong>Project:</strong> {lead.projectDescription}
            </p>
          )}
        </div>

        {lead.status === "new" && (
          <div className="flex gap-3">
            <button
              onClick={() => handleApprove(lead)}
              className="flex-1 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(lead._id)}
              className="flex-1 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition"
            >
              Reject
            </button>
          </div>
        )}

        {lead.status === "contact" && (
          <div className="flex gap-3">
            <button
              onClick={() => handleSuccess(lead)}
              className="flex-1 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition"
            >
              Mark as Success
            </button>
            <button
              onClick={() => handleReject(lead._id)}
              className="flex-1 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition"
            >
              Reject
            </button>
          </div>
        )}

        {lead.status === "converted" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Final Price ($)</label>
              <input
                type="number"
                value={lead.finalPrice}
                onChange={(e) =>
                  handleEditConverted(lead, "finalPrice", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Status</label>
              <input
                type="text"
                value="Converted"
                disabled
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex gap-4 mb-8 border-b border-gray-800">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "new"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-400 hover:text-white"
          }`}
        >
          New Leads ({leads.filter((l) => l.status === "new").length})
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "contact"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Contact Client ({leads.filter((l) => l.status === "contact").length})
        </button>
        <button
          onClick={() => setActiveTab("converted")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "converted"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Converted ({leads.filter((l) => l.status === "converted").length})
        </button>
      </div>

      <div>
        {getFilteredLeads().length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No leads in this category</p>
          </div>
        ) : (
          getFilteredLeads().map(renderLeadCard)
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="glass rounded-2xl p-8 max-w-md mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black/80 flex items-start justify-center"
      >
        <h2 className="text-2xl font-bold mb-6">Success Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Final Price ($)
            </label>
            <input
              type="number"
              value={successData.price}
              onChange={(e) =>
                setSuccessData({ ...successData, price: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
              placeholder="Enter project price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Deadline</label>
            <input
              type="date"
              value={successData.deadline}
              onChange={(e) =>
                setSuccessData({ ...successData, deadline: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Description
            </label>
            <textarea
              rows="4"
              value={successData.description}
              onChange={(e) =>
                setSuccessData({ ...successData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg"
              placeholder="Describe the project details..."
            ></textarea>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={submitSuccess}
              disabled={loading}
              className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save & Convert"}
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadsManager;
