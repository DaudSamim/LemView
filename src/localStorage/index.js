export const getThreadContent = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setThreadContent = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getSelectedItem = () => {
  return JSON.parse(localStorage.getItem("selectedItem"));
};

export const setSelectedItem = (data) => {
  return localStorage.setItem("selectedItem", JSON.stringify(data));
};
