"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  try {
    setLoading(true);

    const data = await authService.login({
      email,
      password,
    });

    Cookies.set("accessToken", data.accessToken, {
      expires: 7,
      sameSite: "lax",
    });

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Invalid credentials");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mb-6 text-slate-500">
          Login to Kaka ERP
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
  type="email"
  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>


          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
  type="password"
  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-violet-600 py-3 text-white"
>
  {loading ? "Logging in..." : "Login"}
</button>

        </form>

      </div>
    </div>
  );
}