"use server";
import { loginSchema } from "@/app/page";
import { auth } from "@/config/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithEmailAndPassword(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const cookieStore = await cookies();

  // Validate input using the Zod schema.
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    // Format the error message from Zod and store it in a cookie.
    cookieStore.set(
      "loginError",
      "Validation error: " + JSON.stringify(result.error.flatten().fieldErrors)
    );
    // Redirect back to the login page so the UI can display the error.
    redirect("/");
  }

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const uuid = res.user.uid;
    if (uuid && uuid.length !== 0) {
      // Clear any previous login error.
      cookieStore.delete("loginError");
      cookieStore.set("uuid", uuid);
      redirect("/dashboard");
    }
  } catch (error) {
    // TODO: Create a class which digest the error code and spits out user understandable errors
    // Check for a Firebase authentication error code.
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
    // Redirect back to the login page so the UI can show the error.
    redirect("/");
  }
}
