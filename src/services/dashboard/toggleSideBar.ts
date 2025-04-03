"use server";
import { cookies } from "next/headers";

const key = "sideBarDisplayState";

export async function toggleSideBar() {
  const cookieStore = await cookies();
  const currentState = cookieStore.get(key);
  if (!currentState) {
    cookieStore.set(key, "hide");
    return;
  }
  cookieStore.set(key, currentState.value === "show" ? "hide" : "show");
}
