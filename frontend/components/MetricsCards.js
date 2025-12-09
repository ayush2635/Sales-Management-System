"use client";

import React from "react";

const MetricsCards = ({ aggregates, totalCount }) => {
  const {
    totalUnits = 0,
    totalAmount = 0,
    totalDiscount = 0,
  } = aggregates || {};

  return (
    <section className="metrics-row">
      <div className="metric-card">
        <div className="metric-card-header">
          <span>Total units sold</span>
          <i className="bi bi-info-circle"></i>
        </div>
        <div className="metric-card-value">
          {totalUnits.toLocaleString("en-IN")}
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-card-header">
          <span>Total Amount</span>
          <i className="bi bi-info-circle"></i>
        </div>
        <div className="metric-card-value">
          ₹{totalAmount.toLocaleString("en-IN")}
          <span className="metric-subtext">
            ({(totalCount || 0).toLocaleString()} SRs)
          </span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-card-header">
          <span>Total Discount</span>
          <i className="bi bi-info-circle"></i>
        </div>
        <div className="metric-card-value">
          ₹{totalDiscount.toLocaleString("en-IN")}
          <span className="metric-subtext">
            ({(totalCount || 0).toLocaleString()} SRs)
          </span>
        </div>
      </div>
    </section>
  );
};

export default MetricsCards;
