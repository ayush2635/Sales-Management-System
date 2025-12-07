"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import MetricsCards from "../components/MetricsCards";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import { fetchGraphQL } from "../utils/api";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("tx_date");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [page, setPage] = useState(1);

  const [data, setData] = useState({
    sales: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    aggregates: {},
  });
  const [loading, setLoading] = useState(true);

  /* Helper to construct backend filter object */
  const getActiveFilters = useCallback(() => {
    const active = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key === "age") {
          if (value.includes("+")) {
            active.minAge = parseInt(value);
          } else {
            const [min, max] = value.split("-");
            active.minAge = parseInt(min);
            active.maxAge = parseInt(max);
          }
        } else if (key === "tags") {
          active.tags = [value];
        } else if (key === "date") {
          active.startDate = value;
          active.endDate = value;
        } else {
          active[key] = [value];
        }
      }
    }
    return active;
  }, [filters]);

  const loadSales = useCallback(async () => {
    setLoading(true);
    const query = `
      query GetSales($search: String, $filters: FilterInput, $sortBy: String, $sortOrder: String, $page: Int) {
        getSales(search: $search, filters: $filters, sortBy: $sortBy, sortOrder: $sortOrder, page: $page) {
          sales {
            transaction_id
            tx_date
            customer_id
            customer_name
            phone_number
            gender
            age
            product_category
            quantity
            total_amount
            customer_region
            product_id
            employee_name
          }
          totalCount
          totalPages
          currentPage
          aggregates {
            totalUnits
            totalAmount
            totalDiscount
          }
        }
      }
    `;

    const variables = {
      search,
      filters: getActiveFilters(),
      sortBy,
      sortOrder,
      page,
    };

    try {
      const result = await fetchGraphQL(query, variables);
      if (result && result.getSales) {
        setData(result.getSales);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  }, [search, filters, sortBy, sortOrder, page, getActiveFilters]);

  // Initial load and updates
  useEffect(() => {
    loadSales();
  }, [loadSales]);

  // Handlers
  const handleSearch = (term) => {
    setSearch(term);
    setPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleRefresh = () => {
    setSearch("");
    setFilters({});
    setPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  return (
    <main className="main-content">
      <Header onSearch={handleSearch} searchValue={search} />
      <Filters
        filters={filters}
        onChange={handleFilterChange}
        onRefresh={handleRefresh}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <MetricsCards aggregates={data.aggregates} totalCount={data.totalCount} />
      <SalesTable sales={data.sales} loading={loading} />
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}
