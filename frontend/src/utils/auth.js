export const setAuth = (token, user, remember) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));
};

export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const getUser = () => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isLoggedIn = () => !!getToken();
