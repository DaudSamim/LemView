export const getThreadContent = () => {
  return JSON.parse(localStorage.getItem("content"));
};

export const setThreadContent = (data) => {
  return localStorage.setItem("content", JSON.stringify(data));
};
