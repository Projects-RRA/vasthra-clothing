export const isAuthenticated = () => {
    // Check if authToken exists in localStorage
    const authToken = localStorage.getItem("authToken");
    return authToken ? true : false;
  };
  
  export const getUser = () => {
    // Retrieve user details from localStorage
    const user = {
      authToken: localStorage.getItem("authToken"),
      role: localStorage.getItem("role"),
      userName: localStorage.getItem("userName"),
    };
    
    return user.authToken ? user : null; // Return user only if authToken exists
  };
  
  export const logout = () => {
    // Clear authentication-related data
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
  
    window.location.reload(); // Refresh to reflect logout state
  };
  