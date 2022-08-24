import Data from "../models/Data";

class APIService {
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_URL_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then((resp) => {
          localStorage.setItem("token", resp.access_token);
          resolve("");
        })
        .catch((err) => reject(err));
    });
  }

  fetchData(date?: string): Promise<Data> {
    const token = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
      fetch(
        `${process.env.REACT_APP_URL_API}/data${date ? `?date=${date}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(response);
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

export default new APIService();
