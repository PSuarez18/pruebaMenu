import { clearUser } from "../state/slices/user/user";

export const handleLogout = (dispatch, navigate) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("userData");
  navigate("/")
  dispatch(clearUser());
  window.location.reload();
};
