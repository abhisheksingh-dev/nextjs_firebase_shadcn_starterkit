import { loginSchema } from "@/app/page";
import { auth } from "@/config/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

export async function loginWithEmailAndPassword(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const cookieStore = await cookies();

  // Validate input using the Zod schema.
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    cookieStore.set(
      "loginError",
      "Validation error: " + JSON.stringify(result.error.flatten().fieldErrors)
    );
    return { error: "Validation failed", redirect: "/" };
  }

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const uuid = res.user.uid;
    if (uuid && uuid.length !== 0) {
      cookieStore.delete("loginError");
      cookieStore.set("uuid", uuid);
      return { success: true, redirect: "/dashboard" };
    }
  } catch (error) {
    if ((error as { code?: string })?.code) {
      cookieStore.set(
        "loginError",
        "Authentication error: " + (error as { code: string }).code
      );
      console.log("Authentication error:", (error as { code: string }).code);
    } else {
      cookieStore.set("loginError", "An unexpected error occurred");
      console.log("Error signing in", error);
    }
    return { error: "Authentication failed", redirect: "/" };
  }
}
