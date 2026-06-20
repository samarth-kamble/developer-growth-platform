"use server";

import { authClient } from "@/features/auth/lib/auth-client";
import { headers } from "next/headers";
import { prisma } from "@workspace/database";
import { redirect } from "next/navigation";

export async function submitOnboarding(formData: FormData) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session || !session.data || !session.data.user) {
    throw new Error("Not authenticated");
  }

  const userId = session.data.user.id;

  const role = formData.get("role") as string;
  const experienceLevel = formData.get("experienceLevel") as string;

  // tags are passed as JSON strings from the TagInput component
  const techStackStr = formData.get("techStack") as string;
  const techStack = techStackStr ? JSON.parse(techStackStr) : [];

  const goalsStr = formData.get("goals") as string;
  const goals = goalsStr ? JSON.parse(goalsStr) : [];

  await prisma.user.update({
    where: { id: userId },
    data: {
      role,
      experienceLevel,
      techStack,
      goals,
      onboardingCompleted: true,
    },
  });

  redirect("/dashboard");
}
