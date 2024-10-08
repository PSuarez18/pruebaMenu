export const logout = async (setIsAuthenticated, navigate) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("userData");
  localStorage.removeItem("someOtherKey");
  localStorage.removeItem("userData");
  navigate("/");
  setIsAuthenticated(false);
};
