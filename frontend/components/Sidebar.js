"use client";

import React, { useState } from "react";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState({
    services: true,
    invoices: true,
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-area">
          <div className="logo-icon">V</div>
          <div className="logo-text">
            <h3>Vault</h3>
            <p>Anurag Yadav</p>
          </div>
        </div>
        <i className="bi bi-chevron-down"></i>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="#" className="nav-item">
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-item">
              <i className="bi bi-people"></i>
              <span>Nexus</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-item">
              <i className="bi bi-box-arrow-in-down"></i>
              <span>Intake</span>
            </a>
          </li>
          <li>
            <div
              className="nav-item has-submenu"
              onClick={() => toggleSection("services")}
            >
              <div className="nav-item-content">
                <i className="bi bi-clipboard-check"></i>
                <span>Services</span>
              </div>
              <i
                className={`bi bi-chevron-${
                  openSection.services ? "up" : "down"
                }`}
              ></i>
            </div>
            {openSection.services && (
              <ul className="submenu">
                <li>
                  <a href="#">
                    <i className="bi bi-circle"></i> Pre-active
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-circle"></i> Active
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-x-circle"></i> Blocked
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-check-circle"></i> Closed
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="nav-item has-submenu"
              onClick={() => toggleSection("invoices")}
            >
              <div className="nav-item-content">
                <i className="bi bi-file-text"></i>
                <span>Invoices</span>
              </div>
              <i
                className={`bi bi-chevron-${
                  openSection.invoices ? "up" : "down"
                }`}
              ></i>
            </div>
            {openSection.invoices && (
              <ul className="submenu">
                <li>
                  <a href="#" className="active">
                    <i className="bi bi-file-earmark-text"></i> Proforma
                    Invoices
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-file-earmark-check"></i> Final Invoices
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
