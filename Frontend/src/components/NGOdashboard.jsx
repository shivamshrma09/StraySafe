import React from 'react';
import './NGODashboard.css';

const activeReports = [
  {
    id: 101,
    photo: 'dog1.jpg',
    animal: 'Dog',
    location: 'Lajpat Nagar',
    status: 'Active',
    situation: 'Injured',
    description: 'Found limping near market',
    time: '2025-06-22 10:30',
    name: 'Rohit',
    phone: '9876543210'
  },
  // Add more report objects as needed
];

export default function NGOdashboard() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="leftnav">
          <img src="whatsapp.jpg" alt="Logo" />
          <span className="brand">StraySafe</span>
        </div>
        <div className="rightnav">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Completed</li>
            <li>
              <button className="signup-btn">Log Out</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Organisation Info */}
      <div className="dashboard-info">
        <div className="info">
          <strong>Organisation name:</strong> <span>VISION foundation</span>
                    <strong>Location:</strong> <span>New Delhi</span>
          <strong>Total Rescue:</strong> <span>+12</span>

        </div>
        <div className="info">
          <strong>Total Rescue:</strong> <span>12</span>
        </div>
        <div className="info">
          <strong>Location:</strong> <span>New Delhi</span>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <h2>Active Rescue Reports</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Animal Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>ID</th>
              <th>Situation</th>
              <th>Description</th>
              <th>Time</th>
              <th>Name</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            {activeReports.map((r) => (
              <tr key={r.id}>
                <td>
                  <img src={r.photo} alt={r.animal} style={{ width: 48, height: 48, borderRadius: '8px' }} />
                </td>
                <td>{r.animal}</td>
                <td>{r.location}</td>
                <td>
                  <span className={`dash-status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>
                <td>{r.id}</td>
                <td>{r.situation}</td>
                <td>{r.description}</td>
                <td>{r.time}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
