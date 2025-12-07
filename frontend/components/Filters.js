"use client";

import React, { useEffect, useState } from "react";
import { fetchGraphQL } from "../utils/api";

const Filters = ({
  filters,
  onChange,
  onRefresh,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const [options, setOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    paymentMethods: [],
  });

  useEffect(() => {
    const loadOptions = async () => {
      const query = `
        query GetOptions {
          getFilterOptions {
            regions
            genders
            categories
            paymentMethods
          }
        }
      `;
      try {
        const data = await fetchGraphQL(query);
        if (data && data.getFilterOptions) {
          setOptions(data.getFilterOptions);
        }
      } catch (e) {
        console.error("Failed to load options", e);
      }
    };
    loadOptions();
  }, []);

  const ageRanges = ["18-25", "26-35", "36-45", "46-55", "56+"];
  const staticTags = [
    "accessories",
    "beauty",
    "casual",
    "cotton",
    "fashion",
    "formal",
    "fragrance-free",
    "gadgets",
    "makeup",
    "organic",
    "portable",
    "skincare",
    "smart",
    "unisex",
    "wireless",
  ];

  const handleSortChange = (e) => {
    const parts = e.target.value.split("_");
    const order = parts.pop();
    const field = parts.join("_");
    onSortChange(field, order);
  };

  const getSortValue = () => {
    if (!sortBy) return "tx_date_DESC";
    return `${sortBy}_${sortOrder}`;
  };

  return (
    <section className="filters-bar">
      <div className="filter-group">
        <select
          value={filters.customer_region || ""}
          onChange={(e) => onChange("customer_region", e.target.value)}
        >
          <option value="">Customer Region</option>
          {options.regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={filters.gender || ""}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          <option value="">Gender</option>
          {options.genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={filters.age || ""}
          onChange={(e) => onChange("age", e.target.value)}
        >
          <option value="">Age Range</option>
          {ageRanges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={filters.product_category || ""}
          onChange={(e) => onChange("product_category", e.target.value)}
        >
          <option value="">Product Category</option>
          {options.categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filters.tags || ""}
          onChange={(e) => onChange("tags", e.target.value)}
        >
          <option value="">Tags</option>
          {staticTags.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={filters.payment_method || ""}
          onChange={(e) => onChange("payment_method", e.target.value)}
        >
          <option value="">Payment Method</option>
          {options.paymentMethods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="date-input"
          placeholder="Select Date"
          value={filters.date || ""}
          onChange={(e) => onChange("date", e.target.value)}
        />

        <select value={getSortValue()} onChange={handleSortChange}>
          <option value="customer_name_ASC">Sort by: Name (A-Z)</option>
          <option value="customer_name_DESC">Sort by: Name (Z-A)</option>
          <option value="tx_date_DESC">Sort by: Date (Newest)</option>
          <option value="tx_date_ASC">Sort by: Date (Oldest)</option>
          <option value="total_amount_DESC">Sort by: Amount (H-L)</option>
          <option value="total_amount_ASC">Sort by: Amount (L-H)</option>
        </select>

        <button
          className="refresh-btn"
          onClick={onRefresh}
          title="Reset Filters"
        >
          <i className="bi bi-arrow-clockwise"></i> Reset
        </button>
      </div>
    </section>
  );
};

export default Filters;
