"use server";
import { cookies } from "next/headers";

const key = "sideBarDisplayState";

export async function toggleSideBar() {
  const cookieStore = await cookies();
  const currentState = cookieStore.get(key);
  cookieStore.set(
    key,
    !currentState ? "hide" : currentState.value === "show" ? "hide" : "show"
  );
}
