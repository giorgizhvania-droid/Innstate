import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getContent } from "@/lib/content";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const content = await getContent();
  return <AdminDashboard initialContent={content} />;
}
