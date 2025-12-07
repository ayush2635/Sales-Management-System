const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/graphql";

export const fetchGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 0 },
    });
    const result = await response.json();
    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      throw new Error(result.errors[0].message);
    }
    return result.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};
