import SideBar from "@/components/dashboardComponents/sidebar";
import TopBar from "@/components/dashboardComponents/topBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const uuidCookie = cookieStore.get("uuid");
  if (!uuidCookie) {
    redirect("/");
  }
  return (
    <main className="flex">
      {/* Side Bar */}
      <SideBar />
      {/* Main Content */}
      <div className="grow">
        {/* Top Bar */}
        <TopBar />
        {/* Children */}
        {children}
      </div>
    </main>
  );
}
