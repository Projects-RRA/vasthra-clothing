export const isAuthenticated = async () => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
          method: "GET",
          credentials: "include", // 🔥 Important: Sends cookies with the request
      });

      if (!response.ok) {
          return null; // Not authenticated
      }

      const data = await response.json();
      return data.user;
  } catch (error) {
      console.error("Auth check failed:", error);
      return null;
  }
};

export const logout = async () => {
  try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/logout`, {
          method: "POST",
          credentials: "include", // 🔥 Important: Ensures cookies are cleared
      });
      window.location.reload();
  } catch (error) {
      console.error("Logout failed:", error);
  }
};
