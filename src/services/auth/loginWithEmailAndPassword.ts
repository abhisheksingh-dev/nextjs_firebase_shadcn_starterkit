"use server";
import { loginSchema } from "@/app/page";
import { auth } from "@/config/firebase_config";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithEmailAndPassword(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    throw new Error(
      "Invalid input: " + JSON.stringify(result.error.flatten().fieldErrors)
    );
  }
  const cookieStore = await cookies();
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const uuid = res.user.uid;
    if (uuid && uuid.length !== 0) {
      cookieStore.set("uuid", res.user.uid);
      redirect("/dashboard");
    }
  } catch (error) {
    if ((error as { code?: string })?.code) {
      cookieStore.set("loginError", (error as { code: string }).code);
      console.log("Authentication error:", (error as { code: string }).code);
    } else {
      cookieStore.set("loginError", "Error");
      console.log("Error signing in", error);
    }
  }
}
