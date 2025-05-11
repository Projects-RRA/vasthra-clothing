import { cookies } from "next/headers";
import  { jwtDecode } from "jwt-decode";

export async  function getUserFromServer() {
  const cookieStore = await  cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("JWT decoding failed:", err);
    return null;
  }
}
