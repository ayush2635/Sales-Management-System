"use client";

import React from "react";

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const normalized =
      typeof dateString === "string"
        ? dateString.replace(" ", "T")
        : dateString;
    const date = new Date(normalized);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  } catch (e) {
    return "";
  }
};

const SalesTable = ({ sales, loading }) => {
  return (
    <div className="table-container">
      <table id="salesTable">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer region</th>
            <th>Product ID</th>
            <th>Employee name</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.transaction_id}>
              <td className="id-col">{sale.transaction_id}</td>
              <td>{formatDate(sale.tx_date)}</td>
              <td style={{ fontWeight: 600 }}>{sale.customer_id}</td>
              <td className="name-col">{sale.customer_name}</td>
              <td>
                {sale.phone_number}
                <i
                  className="bi bi-files"
                  style={{ color: "#9ca3af", marginLeft: 6, cursor: "pointer" }}
                ></i>
              </td>
              <td>{sale.gender}</td>
              <td>{sale.age}</td>
              <td className="category-col">{sale.product_category}</td>
              <td style={{ fontWeight: 600 }}>
                {(sale.quantity || 0).toString().padStart(2, "0")}
              </td>
              <td className="amount-col">
                ₹ {(sale.total_amount || 0).toLocaleString("en-IN")}
              </td>
              <td style={{ fontWeight: 600 }}>{sale.customer_region}</td>
              <td style={{ fontWeight: 600 }}>{sale.product_id}</td>
              <td style={{ fontWeight: 600 }}>{sale.employee_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="state-msg">Loading...</div>}
      {!loading && sales.length === 0 && (
        <div className="state-msg">No results found</div>
      )}
    </div>
  );
};

export default SalesTable;
