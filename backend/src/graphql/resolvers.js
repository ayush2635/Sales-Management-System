const salesService = require("../services/salesService");

const resolvers = {
  getSales: async ({ search, filters, sortBy, sortOrder, page, limit }) => {
    try {
      return await salesService.getSales({
        search,
        filters,
        sortBy,
        sortOrder,
        page,
        limit,
      });
    } catch (error) {
      console.error("Error in getSales resolver:", error);
      throw new Error("Failed to fetch sales data");
    }
  },
  getFilterOptions: async () => {
    try {
      return await salesService.getFilterOptions();
    } catch (error) {
      console.error("Error in getFilterOptions resolver:", error);
      throw new Error("Failed to fetch filter options");
    }
  },
};

module.exports = resolvers;
