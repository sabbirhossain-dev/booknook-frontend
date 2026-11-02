"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
  BookOpen,
  ChevronDown,
  FileText,
  Mail,
  PenLine,
  Tags,
  Lock,
  User,
  ImagePlus,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
  "kids",
  "Self Help",
  "Children",
  "Technology",
  "Romance",
  "Mystery",
];

const inputClass =
  "w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

const AddBookPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Image states
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Upload image to ImgBB
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // File validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB!");
      return;
    }

    setUploading(true);
    setImageUrl("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        throw new Error("ImgBB API key is missing!");
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Image upload failed!");
      }

      setImageUrl(data.data.url);

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to upload image!",
      );
    } finally {
      setUploading(false);
    }
  };

  // Submit book
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploading) {
      toast.error("Please wait for image upload to finish.");
      return;
    }

    if (!imageUrl) {
      toast.error("Please upload a book image first.");
      return;
    }

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    const bookData = {
      ...formData,
      totalCopies: Number(formData.totalCopies),
      image: imageUrl,
    };

    try {
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to add book");
        return;
      }

      toast.success("Book added successfully!");

      form.reset();
      setImageUrl("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl py-10 sm:py-14 px-4">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-gradient-to-b from-blue-50 via-white to-white px-6 py-10 text-center sm:py-12">
        <div className="pointer-events-none absolute -left-16 -top-10 h-48 w-48 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-14 -right-12 h-52 w-52 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative z-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <BookOpen size={26} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Add a Book
          </h1>

          <p className="mt-3 text-gray-500 sm:text-lg">
            Put a book from your shelf into the library.
          </p>
        </div>
      </header>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Book Title */}
          <div>
            <label htmlFor="title" className={labelClass}>
              Book Title
            </label>

            <div className="relative">
              <BookOpen
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. The Great Gatsby"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Author Name */}
          <div>
            <label htmlFor="author" className={labelClass}>
              Author Name
            </label>

            <div className="relative">
              <PenLine
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="author"
                name="author"
                type="text"
                placeholder="e.g. F. Scott Fitzgerald"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>

            <div className="relative">
              <Tags
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="category"
                name="category"
                defaultValue="Fiction"
                className={`${inputClass} appearance-none pr-10`}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Total Copies */}
          <div>
            <label htmlFor="totalCopies" className={labelClass}>
              Total Copies
            </label>

            <input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min={1}
              defaultValue={1}
              className={`${inputClass} !pl-4 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              required
            />
          </div>

          {/* Book Image Upload */}
          <div className="sm:col-span-2">
            <label htmlFor="image" className={labelClass}>
              Book Cover Image
            </label>

            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/60 p-5 transition hover:border-blue-400">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <ImagePlus size={24} />
                </div>

                <div className="text-center">
                  <p className="font-semibold text-gray-700">
                    Upload your book cover
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP (Maximum 5MB)
                  </p>
                </div>

                <input
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                  className="w-full max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-white text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:font-semibold file:text-blue-600 hover:file:bg-blue-100 disabled:opacity-50"
                />

                {/* Uploading */}
                {uploading && (
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <Loader2 size={17} className="animate-spin" />
                    Uploading image...
                  </div>
                )}

                {/* Upload Success */}
                {imageUrl && !uploading && (
                  <div className="mt-3 flex w-full flex-col items-center">
                    <div className="relative h-44 w-36 overflow-hidden rounded-xl border bg-white shadow-sm">
                      <Image
                        src={imageUrl}
                        alt="Uploaded book cover"
                        fill
                        unoptimized
                        sizes="144px"
                        className="object-cover"
                      />
                    </div>

                    <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-600">
                      <CheckCircle2 size={17} />
                      Image uploaded successfully!
                    </p>

                    <p className="mt-1 max-w-full break-all text-center text-xs text-gray-400">
                      {imageUrl}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Short Description
            </label>

            <div className="relative">
              <FileText
                size={19}
                className="absolute left-4 top-4 text-gray-400"
              />

              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="A short, inviting summary that makes readers want to pick this book up..."
                className={`${inputClass} min-h-32 resize-y pl-11 leading-6`}
                required
              />
            </div>
          </div>

          {/* User Name */}
          <div>
            <label htmlFor="userName" className={labelClass}>
              User Name
            </label>

            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="userName"
                name="userName"
                type="text"
                value={user?.name || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-600`}
              />
            </div>
          </div>

          {/* User Email */}
          <div>
            <label htmlFor="userEmail" className={labelClass}>
              User Email
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="userEmail"
                name="userEmail"
                type="email"
                value={user?.email || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-600`}
              />
            </div>
          </div>

          {/* Hint */}
          <p className="flex items-center gap-1.5 text-xs text-gray-400 sm:col-span-2">
            <Lock size={13} />
            Your name and email are filled automatically from your account.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading || !imageUrl || !user}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          {uploading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Uploading Image...
            </>
          ) : (
            <>
              <BookOpen size={18} />
              Add Book
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
