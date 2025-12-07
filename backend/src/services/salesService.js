const db = require("../config/db");

const salesService = {
  getSales: async ({
    search,
    filters,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10,
  }) => {
    let whereClause = "WHERE 1=1";
    const params = [];
    let paramIndex = 1;
    if (search) {
      whereClause += ` AND (customer_name ILIKE $${paramIndex} OR phone_number ILIKE $${paramIndex} OR product_name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (filters) {
      if (filters.gender && filters.gender.length > 0) {
        whereClause += ` AND gender = ANY($${paramIndex})`;
        params.push(filters.gender);
        paramIndex++;
      }
      if (filters.customer_region && filters.customer_region.length > 0) {
        whereClause += ` AND customer_region = ANY($${paramIndex})`;
        params.push(filters.customer_region);
        paramIndex++;
      }
      if (filters.product_category && filters.product_category.length > 0) {
        whereClause += ` AND product_category = ANY($${paramIndex})`;
        params.push(filters.product_category);
        paramIndex++;
      }
      if (filters.tags && filters.tags.length > 0) {
        const tagConditions = filters.tags
          .map((_, i) => `tags ILIKE $${paramIndex + i}`)
          .join(" OR ");
        whereClause += ` AND (${tagConditions})`;
        filters.tags.forEach((t) => params.push(`%${t}%`));
        paramIndex += filters.tags.length;
      }
      if (filters.payment_method && filters.payment_method.length > 0) {
        whereClause += ` AND payment_method = ANY($${paramIndex})`;
        params.push(filters.payment_method);
        paramIndex++;
      }
      if (filters.minAge) {
        whereClause += ` AND age >= $${paramIndex}`;
        params.push(filters.minAge);
        paramIndex++;
      }
      if (filters.maxAge) {
        whereClause += ` AND age <= $${paramIndex}`;
        params.push(filters.maxAge);
        paramIndex++;
      }
      if (filters.startDate) {
        whereClause += ` AND tx_date >= $${paramIndex}`;
        params.push(filters.startDate);
        paramIndex++;
      }
      if (filters.endDate) {
        whereClause += ` AND tx_date <= $${paramIndex}`;
        params.push(filters.endDate);
        paramIndex++;
      }
    }

    const countQuery = `SELECT COUNT(*) FROM public.users_sales ${whereClause}`;
    const aggQuery = `
      SELECT 
        COALESCE(SUM(quantity), 0) as total_units,
        COALESCE(SUM(final_amount), 0) as total_amount,
        COALESCE(SUM(total_amount - final_amount), 0) as total_discount
      FROM public.users_sales ${whereClause}
    `;

    let dataQuery = `SELECT * FROM public.users_sales ${whereClause}`;

    const validSortFields = [
      "tx_date",
      "quantity",
      "customer_name",
      "total_amount",
    ];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "tx_date";
    const order =
      sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    dataQuery += ` ORDER BY ${sortField} ${order}`;

    const offset = (page - 1) * limit;
    dataQuery += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;

    try {
      const [countResult, aggResult, dataResult] = await Promise.all([
        db.query(countQuery, params),
        db.query(aggQuery, params),
        db.query(dataQuery, [...params, limit, offset]),
      ]);

      const totalCount = parseInt(countResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalCount / limit);
      const aggregates = aggResult.rows[0];

      return {
        sales: dataResult.rows.map((row) => ({
          ...row,
          tx_date: row.tx_date ? new Date(row.tx_date).toISOString() : null,
        })),
        totalCount,
        totalPages,
        currentPage: page,
        aggregates: {
          totalUnits: parseInt(aggregates.total_units, 10),
          totalAmount: parseFloat(aggregates.total_amount),
          totalDiscount: parseFloat(aggregates.total_discount),
        },
      };
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },

  getFilterOptions: async () => {
    try {
      const regionsRes = await db.query(
        "SELECT DISTINCT customer_region FROM public.users_sales WHERE customer_region IS NOT NULL"
      );
      const gendersRes = await db.query(
        "SELECT DISTINCT gender FROM public.users_sales WHERE gender IS NOT NULL"
      );
      const categoriesRes = await db.query(
        "SELECT DISTINCT product_category FROM public.users_sales WHERE product_category IS NOT NULL"
      );
      const paymentsRes = await db.query(
        "SELECT DISTINCT payment_method FROM public.users_sales WHERE payment_method IS NOT NULL"
      );

      return {
        regions: regionsRes.rows.map((r) => r.customer_region),
        genders: gendersRes.rows.map((r) => r.gender),
        categories: categoriesRes.rows.map((r) => r.product_category),
        paymentMethods: paymentsRes.rows.map((r) => r.payment_method),
      };
    } catch (err) {
      console.error("Error fetching filter options:", err);
      throw err;
    }
  },
};

module.exports = salesService;
