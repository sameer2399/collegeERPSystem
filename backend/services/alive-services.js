import axios from "axios";

class Auth {
  async aliveLogin(auid, password) {
    const response = await axios({
      url: process.env.ALIVE_LOGIN,
      method: "POST",
      data: {
        username: auid,
        password: password,
        usertype: "STUDENT",
        device: "desktop",
        browser_info: {
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          language: "en-GB",
          browserName: "Chrome",
          fullVersion: "131.0.0.0 Safari/537.36",
          version: "131",
        },
      },
      headers: {
        Origin: "https://alive.university",
        Referer: "https://alive.university/",
        authority: "alive-core-api.alive.university",
      },
    });
    return response.data.token;
  }
  async getOnlineClasses(token) {
    const currentDate = new Date().toISOString().split("T")[0];
    console.log(currentDate);
    const response = await axios({
      url: `https://alive-core-api.alive.university/api/v1/classes?date=2024-12-26`,
      method: "GET",
      headers: {
        Origin: "https://alive.university",
        Referer: "https://alive.university/",
        authority: "alive-core-api.alive.university",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    if (!response.data.success) {
      return [];
    }
    return response.data.data;
  }
}

export default new Auth();
