"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner label="Loading profile..." />
      </div>
    );
  }

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Failed to sign out.");
      return;
    }
    toast.success("Signed out successfully.");
    router.replace("/");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100"
            />
          ) : (
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white ring-4 ring-blue-100">
              {getInitials(user.name)}
            </span>
          )}

          <h1 className="mt-5 text-2xl font-bold text-gray-900">{user.name}</h1>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 break-all">
            <Mail size={16} className="shrink-0 text-gray-400" />
            {user.email}
          </p>

          <Link
            href="/my-books"
            className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <UserRound size={18} />
            My Books
          </Link>

          <button
            onClick={handleSignOut}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-200"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
