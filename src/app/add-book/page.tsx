// "use client";

// import { useState, type ChangeEvent, type FormEvent } from "react";
// import Image from "next/image";
// import {
//   BookOpen,
//   ChevronDown,
//   FileText,
//   Hash,
//   Lock,
//   Mail,
//   PenLine,
//   Tags,
//   Upload,
//   User,
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

// const categories = [
//   "Fiction",
//   "Non-Fiction",
//   "Science",
//   "History",
//   "Biography",
//   "Self Help",
//   "Children",
//   "Technology",
//   "Romance",
//   "Mystery",
// ];

// const inputClass =
//   "w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";
// const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

// const AddBookPage = () => {
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   //   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//   //     const file = e.target.files?.[0];
//   //     if (!file) return;
//   //     setFileName(file.name);
//   //     if (preview) URL.revokeObjectURL(preview);
//   //     setPreview(URL.createObjectURL(file));
//   //   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const data = Object.fromEntries(new FormData(form).entries());

//     try {
//       const res = await fetch("http://localhost:5000/books", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       console.log(data);

//       const result = await res.json().catch(() => null);

//       console.log("Add book response:", result);

//       if (!res.ok) {
//         toast.error(
//           result?.message || "Failed to add the book. Please try again.",
//         );
//         return;
//       }

//       toast.success("Book added successfully!");
//       form.reset();
//     } catch (err) {
//       console.error("Add book error:", err);
//       toast.error("Could not reach the server.");
//     }
//   };

//   //user session
//   const { data: session } = authClient.useSession();

//   const user = session?.user;

//   return (
//     <div className="mx-auto w-full max-w-4xl py-10 sm:py-14">
//       {/* Header */}
//       <header className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-gradient-to-b from-blue-50 via-white to-white px-6 py-10 text-center sm:py-12">
//         <div className="pointer-events-none absolute -left-16 -top-10 h-48 w-48 rounded-full bg-blue-100/60 blur-3xl" />
//         <div className="pointer-events-none absolute -bottom-14 -right-12 h-52 w-52 rounded-full bg-indigo-100/60 blur-3xl" />

//         <div className="relative z-10">
//           <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
//             <BookOpen size={26} />
//           </div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
//             Add a Book
//           </h1>
//           <p className="mt-3 text-gray-500 sm:text-lg">
//             Put a book from your shelf into the library.
//           </p>
//         </div>
//       </header>

//       {/* Form Card */}
//       <form
//         onSubmit={handleSubmit}
//         className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8"
//       >
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
//           {/* Book Title */}
//           <div>
//             <label htmlFor="title" className={labelClass}>
//               Book Title
//             </label>
//             <div className="relative">
//               <BookOpen
//                 size={19}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 id="title"
//                 name="title"
//                 type="text"
//                 placeholder="e.g. The Great Gatsby"
//                 className={inputClass}
//                 required
//               />
//             </div>
//           </div>

//           {/* Author Name */}
//           <div>
//             <label htmlFor="author" className={labelClass}>
//               Author Name
//             </label>
//             <div className="relative">
//               <PenLine
//                 size={19}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 id="author"
//                 name="author"
//                 type="text"
//                 placeholder="e.g. F. Scott Fitzgerald"
//                 className={inputClass}
//                 required
//               />
//             </div>
//           </div>

//           {/* Category */}
//           <div>
//             <label htmlFor="category" className={labelClass}>
//               Category
//             </label>
//             <div className="relative">
//               <Tags
//                 size={19}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <select
//                 id="category"
//                 name="category"
//                 defaultValue="Fiction"
//                 className={`${inputClass} appearance-none pr-10`}
//                 required
//               >
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={18}
//                 className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//             </div>
//           </div>

//           {/* Total Copies */}
//           <div>
//             <label htmlFor="totalCopies" className={labelClass}>
//               Total Copies
//             </label>
//             <div className="relative">
//               <Hash
//                 size={19}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 id="totalCopies"
//                 name="totalCopies"
//                 type="number"
//                 min={1}
//                 defaultValue={1}
//                 className={`${inputClass} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
//                 required
//               />
//             </div>
//           </div>

//           {/* Book Image URL */}
//           <div className="sm:col-span-2">
//             <label htmlFor="image" className={labelClass}>
//               Book Image URL
//             </label>

//             <div className="relative">
//               <input
//                 id="image"
//                 name="image"
//                 type="url"
//                 placeholder="https://example.com/book-image.jpg"
//                 required
//                 className={`${inputClass} !py-2 !px-3 w-full`}
//               />
//             </div>

//             <p className="mt-2 text-xs text-gray-400">
//               Paste a valid image URL (JPG, PNG, or WebP).
//             </p>
//           </div>

//           {/* Short Description */}
//           <div className="sm:col-span-2">
//             <label htmlFor="description" className={labelClass}>
//               Short Description
//             </label>
//             <div className="relative">
//               <FileText
//                 size={19}
//                 className="absolute left-4 top-4 text-gray-400"
//               />
//               <textarea
//                 id="description"
//                 name="description"
//                 rows={4}
//                 placeholder="A short, inviting summary that makes readers want to pick this book up..."
//                 className={`${inputClass} min-h-32 resize-y pl-11 leading-6`}
//                 required
//               />
//             </div>
//           </div>

//           {/* User Name */}
//           <div>
//             <label htmlFor="userName" className={labelClass}>
//               User Name
//             </label>
//             <div className="relative">
//               <User
//                 size={19}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 id="userName"
//                 name="userName"
//                 type="text"
//                 defaultValue={user?.name || ""}
//                 readOnly
//                 className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-600`}
//               />
//             </div>
//           </div>

//           {/* User Email */}
//           <div>
//             <label htmlFor="userEmail" className={labelClass}>
//               User Email
//             </label>
//             <div className="relative">
//               <Mail
//                 size={19}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 id="userEmail"
//                 name="userEmail"
//                 type="email"
//                 defaultValue={user?.email || ""}
//                 readOnly
//                 className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-600`}
//               />
//             </div>
//           </div>

//           {/* Hint */}
//           <p className="flex items-center gap-1.5 text-xs text-gray-400 sm:col-span-2">
//             <Lock size={13} />
//             Your name and email are filled automatically from your account.
//           </p>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="mt-7 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-blue-200"
//         >
//           <BookOpen size={18} />
//           Add Book
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBookPage;
