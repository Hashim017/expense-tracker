import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/currentUser";
import AuthForm from "@/components/AuthForm";
import PublicHeader from "@/components/PublicHeader";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/");
  return (
    <>
      <PublicHeader />
      <AuthForm mode="login" />
    </>
  );
}