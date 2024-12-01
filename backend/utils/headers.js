export function header(token) {
  return {
    Origin: "https://alive.university",
    Referer: "https://alive.university/",
    Authorization: `Bearer ${token}`,
  };
}
