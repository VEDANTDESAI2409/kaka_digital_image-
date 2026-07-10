"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  function logout() {
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    router.push("/auth/login");
  }

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}