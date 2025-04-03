"use server";
import { auth } from "@/config/firebase_config";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function ServerLogout() {
  const cookieStore = await cookies();
  await signOut(auth);
  cookieStore.delete("uuid");
  cookieStore.delete("loginError");
  redirect("/");
}
