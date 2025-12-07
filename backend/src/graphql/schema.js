const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Sale {
    transaction_id: String
    tx_date: String
    customer_id: String
    customer_name: String
    phone_number: String
    gender: String
    age: Int
    customer_region: String
    customer_type: String
    product_id: String
    product_name: String
    brand: String
    product_category: String
    tags: String
    quantity: Int
    price_per_unit: Float
    discount_percentage: Float
    total_amount: Float
    final_amount: Float
    payment_method: String
    order_status: String
    delivery_type: String
    store_id: String
    store_location: String
    salesperson_id: String
    employee_name: String
  }

  type Aggregates {
    totalUnits: Int
    totalAmount: Float
    totalDiscount: Float
  }

  type SalesResponse {
    sales: [Sale]
    totalCount: Int
    totalPages: Int
    currentPage: Int
    aggregates: Aggregates
  }

  input FilterInput {
    gender: [String]
    customer_region: [String]
    product_category: [String]
    tags: [String]
    payment_method: [String]
    minAge: Int
    maxAge: Int
    startDate: String
    endDate: String
  }

  type Query {
    getSales(
      search: String
      filters: FilterInput
      sortBy: String
      sortOrder: String
      page: Int
      limit: Int
    ): SalesResponse

    getFilterOptions: FilterOptions
  }

  type FilterOptions {
    regions: [String]
    genders: [String]
    categories: [String]
    paymentMethods: [String]
  }
`);

module.exports = schema;
