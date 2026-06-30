export const from_date = new Date(new Date().setDate(new Date().getDate() - 7))
  .toISOString()
  .split("T")[0];
export const to_date = new Date().toISOString().split("T")[0];
