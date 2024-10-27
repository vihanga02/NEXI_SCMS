import Sidebar from "../../components/Sidebar/Sidebar.js";
import Topbar from "../../components/Topbar/Topbar.js";
import "./Assistant.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Assistant() {
  const navigate = useNavigate();

  // State to store assistant data
  const [assistants, setAssistants] = useState([]);
  const [newAssistantName, setNewAssistantName] = useState("");

  useEffect(() => {
    axios
      .get("/admin/assistantsofstore", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setAssistants(response.data); // Set the fetched data to the assistants state
      })
      .catch((error) => {
        console.error("Error fetching assistant data:", error);
        navigate("/");
      });
  }, []);

  const removeAssistant = (assistantId) => {
    axios
      .delete(`/admin/assistant/${assistantId}`, { withCredentials: true })
      .then(() => {
        setAssistants(assistants.filter(assistant => assistant.Assistant_ID !== assistantId));
      })
      .catch((error) => {
        console.error("Error removing assistant:", error);
      });
  };

  const addAssistant = () => {
    axios
      .post("/admin/assistant", { name: newAssistantName }, { withCredentials: true })
      .then((response) => {
        setAssistants([...assistants, response.data]);
        setNewAssistantName("");
      })
      .catch((error) => {
        console.error("Error adding assistant:", error);
      });
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
    </div>
  );
}

export default Assistant;
