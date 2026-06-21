import { apiClient } from "@/features/core/lib/api-client";

export async function getProfileData(headersList: Headers) {
  try {
    // Forward the cookie to the API Gateway
    const cookie = headersList.get("cookie") || "";
    const res = await apiClient("/api/users/me", {
      headers: { cookie },
      cache: "no-store"
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch profile from microservice:", error);
    return null;
  }
}
