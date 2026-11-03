"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/assets/logo.png";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: loginData.email as string,
        password: loginData.password as string,
      });

      if (error) {
        toast.error(error.message || "Login failed!");
        return;
      }

      if (data) {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong!");
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("clicked");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Image
                src={logo}
                alt="BookNook Logo"
                height={20}
                width={20}
                className="h-8 w-auto"
              />
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Back!
              </h1>
            </div>
            <p className="text-gray-500 mt-2">
              Login to continue your reading journey.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5 " onSubmit={handleLogIn}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Forget Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-200"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-100 cursor-pointer py-3 rounded-xl font-semibold text-gray-700 transition"
          >
            <svg width="21" height="21" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.27 5.64c4.25-3.92 7.51-9.72 7.51-17.29z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.53 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.78l-7.27-5.64c-2.02 1.35-4.6 2.15-8.64 2.15-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          © 2026 BookNest. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
