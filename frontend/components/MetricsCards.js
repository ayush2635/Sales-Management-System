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
      <div className="metric-card-pill">
        <span className="metric-label-text">Units Sold:</span>
        <span className="metric-value-text">
          {totalUnits.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="metric-card-pill">
        <span className="metric-label-text">Amount:</span>
        <span className="metric-value-text">
          ₹
          {totalAmount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span
            style={{
              fontWeight: 400,
              fontSize: "0.85rem",
              color: "#6b7280",
              marginLeft: "4px",
            }}
          >
            ({(totalCount || 0).toLocaleString()} SRs)
          </span>
        </span>
      </div>

      <div className="metric-card-pill">
        <span className="metric-label-text">Discount:</span>
        <span className="metric-value-text">
          ₹
          {totalDiscount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span
            style={{
              fontWeight: 400,
              fontSize: "0.85rem",
              color: "#6b7280",
              marginLeft: "10px",
            }}
          >
            ({(totalCount || 0).toLocaleString()} SRs)
          </span>
        </span>
      </div>
    </section>
  );
};

export default MetricsCards;
