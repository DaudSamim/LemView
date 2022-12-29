import axios from "axios";

const callEndpoint = async (url, method, data) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const res = await axios({
    url: url,
    method: method,
    data: data,
    headers: headers,
  })
    .then((res) => res)
    .catch((error) => error);

  return res;
};

export const callGet = async (url) => {
  return await callEndpoint(url, "GET", {});
};
