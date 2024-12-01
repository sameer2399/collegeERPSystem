const baseUrl =
  process.env.REACT_APP_MODE === "dev"
    ? "http://localhost:3505/v1/api"
    : "https://acharya-erp.vercel.app/v1/api";

export default baseUrl;
