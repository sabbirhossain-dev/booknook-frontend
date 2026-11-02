"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Image from "next/image";

import logo from "../../../../public/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Password Requirement Component
const Requirement = ({ valid, text }: { valid: boolean; text: string }) => (
  <div
    className={`flex items-center gap-2 text-xs transition-colors ${
      valid ? "text-emerald-600" : "text-gray-400"
    }`}
  >
    {valid ? <CheckCircle2 size={15} /> : <Circle size={15} />}
    <span>{text}</span>
  </div>
);

// Input Wrapper
const InputIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <Icon
    size={19}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  />
);

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const isFormValid = isPasswordValid && passwordsMatch;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    const formatData = new FormData(e.currentTarget);
    const formData = Object.fromEntries(formatData.entries()) as {
      name: string;
      email: string;
      password: string;
      image?: string;
    };

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      if (data) {
        toast.success("Registration successful!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8">
          {/* Title */}
          <div className="text-center mb-7">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Image
                src={logo}
                alt="BookNook Logo"
                height={20}
                width={20}
                className="h-8 w-auto"
              />
              <h1 className="text-3xl font-bold text-gray-900">
                Create Account
              </h1>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              Join BookNook and start your reading journey.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <InputIcon icon={User} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <InputIcon icon={Mail} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Photo URL
              </label>

              <div className="relative">
                <InputIcon icon={Camera} />

                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <InputIcon icon={Lock} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
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

              {/* Password Validation Messages */}
              {password.length > 0 && !isPasswordValid && (
                <div className="mt-3 space-y-2">
                  {!hasUppercase && (
                    <Requirement
                      valid={false}
                      text="Add at least one uppercase letter (A-Z)"
                    />
                  )}

                  {!hasLowercase && (
                    <Requirement
                      valid={false}
                      text="Add at least one lowercase letter (a-z)"
                    />
                  )}

                  {!hasMinLength && (
                    <Requirement
                      valid={false}
                      text="Password must be at least 6 characters"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <InputIcon icon={Lock} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full pl-11 pr-12 py-3 border rounded-xl outline-none focus:ring-2 transition ${
                    confirmPassword.length > 0
                      ? passwordsMatch
                        ? "border-emerald-400 focus:ring-emerald-100"
                        : "border-red-300 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {/* Password Match Status */}
              {confirmPassword.length > 0 && (
                <div
                  className={`flex items-center gap-2 text-xs mt-2 ${
                    passwordsMatch ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {passwordsMatch ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <Circle size={15} />
                  )}

                  {passwordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </div>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-200 disabled:shadow-none cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-xs text-gray-400 font-medium">
              OR SIGN UP WITH
            </span>

            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Registration */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl font-semibold text-gray-700 transition"
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

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Login Now
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          © 2026 BookNook. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
