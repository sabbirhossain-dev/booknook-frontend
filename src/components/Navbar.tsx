"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, Menu, UserRound, X } from "lucide-react";

import Image from "next/image";
import logo from "../../public/assets/logo.png";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

/* ---------- Profile Avatar ---------- */

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const UserAvatar = ({
  src,
  name,
  className,
}: {
  src?: string | null;
  name: string;
  className?: string;
}) =>
  src ? (
    <Image
      src={src}
      alt={name}
      width={36}
      height={36}
      className={cn("h-9 w-9 rounded-full object-cover", className)}
    />
  ) : (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white",
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );

/* ---------- Navbar Skeleton ---------- */

const NavbarSkeleton = () => (
  <>
    <div className="hidden lg:flex items-center gap-8">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="h-4 w-16 animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>

    <div className="hidden lg:flex items-center gap-3">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
      <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
    </div>
  </>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  /* ---------- Navigation Links ---------- */

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/all-books" },
  ];

  const privateLinks = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  const visibleLinks = user ? [...navLinks, ...privateLinks] : navLinks;

  /* ---------- Active Route ---------- */

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  /* ---------- Close Profile Popup ---------- */

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  /* ---------- Close Mobile Menu on Route Change ---------- */

  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  /* ---------- Sign Out ---------- */

  const handleSignOut = async () => {
    setIsProfileOpen(false);
    setIsOpen(false);

    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Failed to sign out.");
    } else {
      toast.success("Signed out successfully.");
      router.push("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-50 border-b border-gray-100">
      <div>
        <div className="flex items-center justify-between py-3">
          {/* Logo - Left Side */}

          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="BookNest Logo"
              width={40}
              height={40}
              loading="eager"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}

          {!isPending && (
            <div className="hidden lg:flex items-center gap-8">
              {visibleLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium transition duration-200 ${
                    isActive(link.href)
                      ? "text-blue-600 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Skeleton */}

          {isPending && <NavbarSkeleton />}

          {/* Desktop Buttons */}

          {!isPending &&
            (user ? (
              <div className="hidden lg:flex items-center gap-3">
                <div ref={profileRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((open) => !open)}
                    aria-haspopup="menu"
                    aria-expanded={isProfileOpen}
                    aria-label="Open profile menu"
                    className="group flex items-center gap-2.5 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 hover:border-blue-200 hover:bg-blue-50 transition"
                  >
                    <UserAvatar src={user.image} name={user.name} />

                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition">
                      {user.name}
                    </span>

                    <ChevronDown
                      size={16}
                      className={cn(
                        "text-gray-400 transition-transform duration-200",
                        isProfileOpen && "rotate-180 text-blue-600",
                      )}
                    />
                  </button>

                  {/* Profile Popup */}

                  {isProfileOpen && (
                    <div
                      role="menu"
                      aria-label="Profile menu"
                      className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-200/70"
                    >
                      <div className="flex items-center gap-3 p-3">
                        <UserAvatar
                          src={user.image}
                          name={user.name}
                          className="h-11 w-11"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="mx-2 h-px bg-gray-100" />

                      <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <UserRound size={17} />
                        Profile
                      </Link>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-gray-700 font-semibold hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-200"
                >
                  Sign Up
                </Link>
              </div>
            ))}

          {/* Mobile Right Side: User Image + Menu Button */}

          <div className="flex lg:hidden items-center gap-1">
            {/* User Image */}

            {!isPending && user && (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                aria-label="View profile"
              >
                <UserAvatar src={user.image} name={user.name} />
              </Link>
            )}

            {/* Mobile Menu Button */}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}

        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 py-5">
            <div className="flex flex-col gap-1">
              {/* Public + Private Links */}

              {visibleLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`px-4 py-3 font-medium rounded-lg transition ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}

            {isPending ? (
              <div className="mt-4 flex flex-col gap-3 px-4">
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
              </div>
            ) : user ? (
              <div className="flex flex-col gap-3 mt-4 px-4">
                {/* Profile */}

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                >
                  <UserAvatar src={user.image} name={user.name} />

                  <span className="flex flex-col min-w-0">
                    <span className="font-semibold text-gray-900 leading-tight truncate">
                      {user.name}
                    </span>

                    <span className="text-xs text-blue-600">View profile</span>
                  </span>
                </Link>

                {/* Sign Out */}

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 text-center border border-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4 px-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center border border-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
