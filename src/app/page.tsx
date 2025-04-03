import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithEmailAndPassword } from "@/services/auth/loginWithEmailAndPassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Define a Zod schema for login validation.
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
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

  async function handleLogin(formData: FormData) {
    "use server";
    const res = await loginWithEmailAndPassword(formData);
    if (res && res.success) {
      redirect(res.redirect);
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 rounded-2xl shadow-lg bg-white w-96">
        <img
          src="https://placehold.co/300x100"
          alt="Logo"
          className="rounded-xl mb-2 mx-auto"
        />
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <form action={handleLogin} className="space-y-4 w-full flex flex-col">
          <div>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              className="w-full"
            />
            {error?.value === "invalid_email" && (
              <p className="text-red-500 text-sm mt-1">Invalid email address</p>
            )}
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full"
            />
            {error?.value === "invalid_password" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>
          <Button type="submit" className="w-full ">
            Login
          </Button>
          {error &&
            !["invalid_email", "invalid_password"].includes(error.value) && (
              <p className="text-red-500 text-sm text-center mt-2">
                {error.value}
              </p>
            )}
        </form>
      </div>
    </main>
  );
}
