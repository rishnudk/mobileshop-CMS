"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@mobileshop/shared";
import { useAuthStore } from "../../../store/auth-store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Smartphone, Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Invalid credentials!";
      toast.error(msg);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-slate-950 font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="w-full max-w-md p-2">
        <div className="relative overflow-hidden transition-all duration-300 shadow-2xl glass rounded-2xl border-white/5 hover:border-white/10">
          
          {/* Card Border Highlight */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-500 via-primary to-indigo-500" />
          
          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="flex items-center justify-center w-12 h-12 mb-3 text-white rounded-xl bg-gradient-to-tr from-primary to-indigo-500 shadow-lg shadow-primary/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Mobile Repair CMS
              </h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Sign in to manage active repair tickets and customer complaints
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    {...register("email")}
                    disabled={isLoading}
                    className="w-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all bg-slate-900/50 border rounded-lg border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
                    placeholder="name@mobileshop.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-medium text-rose-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    {...register("password")}
                    disabled={isLoading}
                    className="w-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all bg-slate-900/50 border rounded-lg border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-rose-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 text-xs font-medium rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex items-center justify-center w-full py-2.5 text-sm font-semibold text-white transition-all bg-primary rounded-lg shadow-lg hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-primary/20 active:scale-[0.99] disabled:opacity-50 disabled:active:scale-100 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-xs text-slate-500">
                Authorized Personnel Only • Secure 256-bit Encryption
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
