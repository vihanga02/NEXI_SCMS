import Sidebar from "../../components/Sidebar/Sidebar.js";
import Topbar from "../../components/Topbar/Topbar.js";
import "./Assistant.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../components/Alert/Alert";

function Assistant() {
  const navigate = useNavigate();

  // State to store assistant data
  const [assistants, setAssistants] = useState([]);
  const [newAssistantName, setNewAssistantName] = useState("");

  useEffect(() => {
    axios
      .get("/manager/assistantsofstore", { withCredentials: true })
      .then((response) => {
        setAssistants(response.data); // Set the fetched data to the assistants state
      })
      .catch((error) => {
        console.error("Error fetching assistant data:", error);
        navigate("/");
      });
  }, []);

  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [assistantToRemove, setAssistantToRemove] = useState(null);

  const [showAddAlert, setShowAddAlert] = useState(false);

  const removeAssistant = (assistantId) => {
    setShowRemoveAlert(true);
    setAssistantToRemove(assistantId);
  };

  const confirmRemoveAssistant = () => {
    axios
      .delete(`/manager/assistant/${assistantToRemove}`, { withCredentials: true })
      .then(() => {
        setAssistants(assistants.filter(assistant => assistant.Assistant_ID !== assistantToRemove));
        setShowRemoveAlert(false);
        setAssistantToRemove(null);
      })
      .catch((error) => {
        console.error("Error removing assistant:", error);
        setShowRemoveAlert(false);
        setAssistantToRemove(null);
      });
  };

  const cancelRemoveAssistant = () => {
    setShowRemoveAlert(false);
    setAssistantToRemove(null);
  };

  const addAssistant = () => {
    setShowAddAlert(true);
  };

  const confirmAddAssistant = () => {
    axios
      .post("/manager/assistant", { name: newAssistantName }, { withCredentials: true })
      .then((response) => {
        setAssistants([...assistants, response.data]);
        setNewAssistantName("");
        setShowAddAlert(false);
      })
      .catch((error) => {
        console.error("Error adding assistant:", error);
        setShowAddAlert(false);
      });
  };

  const cancelAddAssistant = () => {
    setShowAddAlert(false);
  };

  return (
    <div className="assistant-container">
      <h1 className="assistant-title">Assistants of store</h1>
      <div className="assistant-content">
        <table className="assistant-table">
          <thead className="assistant-table-head">
            <tr className="assistant-table-row">
              <th className="assistant-table-header">Assistant ID</th>
              <th className="assistant-table-header">Assistant Name</th>
              <th className="assistant-table-header">Total Work Hours</th>
              <th className="assistant-table-header">Assistant Status</th>
              <th className="assistant-table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="assistant-table-body">
            {assistants.map((assistant) => (
              <tr key={assistant.Assistant_ID} className="assistant-table-row">
                <td className="assistant-table-data">{assistant.Assistant_ID}</td>
                <td className="assistant-table-data">{assistant.Assistant_Name}</td>
                <td className="assistant-table-data">{assistant.Work_Hours}</td>
                <td className="assistant-table-data">{assistant.Availability}</td>
                <td className="assistant-table-data">
                  <button className="remove-button" onClick={() => removeAssistant(assistant.Assistant_ID)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-assistant">
        <input
          type="text"
          value={newAssistantName}
          onChange={(e) => setNewAssistantName(e.target.value)}
          placeholder="Enter assistant name"
        />
        <button className="add-assistant-button" onClick={addAssistant}>Add Assistant</button>
      </div>
      {showRemoveAlert && (
        <Alert
          message="Are you sure you want to remove this assistant?"
          onConfirm={confirmRemoveAssistant}
          onCancel={cancelRemoveAssistant}
        />
      )}
      {showAddAlert && (
        <Alert
          message="Are you sure you want to add this assistant?"
          onConfirm={confirmAddAssistant}
          onCancel={cancelAddAssistant}
        />
      )}
    </div>
  );
}

export default Assistant;
