"use server";

import { authClient } from "@/features/auth/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { apiClient } from "@/features/core/lib/api-client";

const onboardingSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters"),
  experienceLevel: z.string().min(1, "Please select an experience level"),
  techStack: z.array(z.string()).max(20, "Maximum 20 skills allowed"),
  goals: z.array(z.string()).max(10, "Maximum 10 goals allowed"),
});

export async function submitOnboarding(formData: FormData) {
  try {
    const session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    if (!session || !session.data || !session.data.user) {
      return { error: "You must be logged in to complete onboarding." };
    }

    const userId = session.data.user.id;

    // Safely parse JSON arrays
    let techStack = [];
    let goals = [];
    try {
      const techStackStr = formData.get("techStack") as string;
      techStack = techStackStr ? JSON.parse(techStackStr) : [];
      
      const goalsStr = formData.get("goals") as string;
      goals = goalsStr ? JSON.parse(goalsStr) : [];
    } catch (e) {
      return { error: "Invalid data format for tags." };
    }

    // Validate using Zod
    const validatedData = onboardingSchema.safeParse({
      role: formData.get("role") as string,
      experienceLevel: formData.get("experienceLevel") as string,
      techStack,
      goals,
    });

    if (!validatedData.success) {
      return { error: validatedData.error.issues[0]?.message || "Invalid form data provided." };
    }

    // Call API Gateway to update the profile
    const cookie = (await headers()).get("cookie") || "";
    const response = await apiClient("/api/users/me", {
      method: "PUT",
      headers: {
        cookie,
      },
      body: JSON.stringify({
        ...validatedData.data,
        onboardingCompleted: true,
      }),
    });

    if (!response.ok) {
      throw new Error("API Gateway rejected the profile update");
    }

  } catch (error) {
    console.error("Onboarding error:", error);
    return { error: "An unexpected error occurred while saving your profile. Please try again." };
  }

  // Redirect must happen outside the try-catch block
  redirect("/dashboard");
}
