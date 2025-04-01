import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithEmailAndPassword } from "@/services/auth/loginWithEmailAndPassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Define a Zod schema for login validation.
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default async function LandingPage() {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid");
  const error = cookieStore.get("loginError");

  if (uuid) {
    // If a valid cookie is found, redirect the user to the dashboard.
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col justify-center items-center text-center min-h-screen w-screen">
      <div className="w-fit space-y-5">
        <span>LOGIN</span>
        {/* The form action calls the server action loginWithEmailAndPassword */}
        <form
          action={loginWithEmailAndPassword}
          method="post"
          className="space-y-3"
        >
          <Input name="email" placeholder="Email" type="email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit">Login</Button>
          {error && <span>Error {error.value}</span>}
        </form>
      </div>
    </main>
  );
}
