# 📚 BookNook – A Small Online Library

BookNook is a modern online library management application where users can explore books, add new books, borrow books, and return them easily. It provides a simple and user-friendly platform for book lovers to discover and manage their reading collections.

## 🌐 Live Website

**Live Site:** https://your-booknook-live-url.vercel.app

**Frontend Repository:** https://github.com/sabbirhossain-dev/booknook-frontend

**Backend Repository:** https://github.com/sabbirhossain-dev/booknook-backend

---

## ✨ Features of BookNook

- 📖 **Browse All Books:** Explore all available books with their images, titles, authors, categories, and descriptions.
- ➕ **Add New Books:** Authenticated users can add new books with book images, descriptions, categories, and total available copies.
- 🔍 **Book Details:** View complete information about individual books, including author, category, description, and contributor details.
- 📚 **Borrow Books:** Users can borrow available books with an automatically generated return date.
- 🔄 **Return Books:** Users can return borrowed books and automatically update the available book copies.
- 👤 **User Authentication:** Secure user registration and login using Better Auth.
- 🔐 **Google Authentication:** Users can conveniently sign in using their Google accounts.
- 📝 **Manage My Books:** Users can edit and delete the books they have added.
- 📋 **My Borrowed Books:** View all currently borrowed books with borrowing and return dates.
- 🚫 **Duplicate Borrow Prevention:** Users cannot borrow the same book multiple times simultaneously.
- 📦 **Available Copies Management:** Book availability is automatically updated when books are borrowed or returned.
- 🔒 **Protected Routes:** Private pages and protected API endpoints are accessible only to authenticated users.
- 📱 **Fully Responsive Design:** Enjoy a consistent experience on mobile, tablet, and desktop devices.
- 🎨 **Modern User Interface:** Clean layouts, attractive book cards, interactive components, and smooth navigation.
- 🔔 **Toast Notifications:** Get success and error notifications when performing different actions.

---

## 🛠️ Technologies Used

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Better Auth
- Swiper.js
- React Toast Notifications

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Native Driver
- JWT Authentication
- JOSE

### Authentication

- Better Auth
- MongoDB Adapter
- Google OAuth
- JSON Web Token (JWT)

### Deployment

- Vercel (Frontend Hosting)
- Render (Backend Hosting)
- MongoDB Atlas (Database Hosting)

---

## 📂 Application Pages

| Page         | Route         | Access  |
| ------------ | ------------- | ------- |
| Home         | `/`           | Public  |
| All Books    | `/books`      | Public  |
| Book Details | `/books/[id]` | Private |
| Add Book     | `/add-book`   | Private |
| My Books     | `/my-books`   | Private |
| My Borrows   | `/my-borrows` | Private |
| Login        | `/login`      | Public  |
| SignUp       | `/sign-up`    | Public  |

---

## 📚 How BookNook Works

1. Visit the BookNook website.
2. Browse the available books from the All Books page.
3. Register or log in to your account.
4. Add your own books to the library.
5. View book details before borrowing.
6. Borrow available books.
7. Track borrowed books from the My Borrows page.
8. Return borrowed books when finished.

---

## 🔐 Security & Borrowing Rules

- Authentication is handled using Better Auth.
- Protected API routes require a valid JWT.
- Users can update and delete only their own books.
- Borrow records are associated with the authenticated user's email.
- A user cannot borrow the same book twice simultaneously.
- Available copies decrease automatically when a book is borrowed.
- Available copies increase automatically when a book is returned.
- Books with zero available copies cannot be borrowed.
- Borrowing records are retained after a book is returned.

---

## 🚀 Run This Project Locally

Follow these steps to run the frontend application on your local machine.

### Prerequisites

Make sure you have installed:

- Node.js (LTS version)
- npm
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/sabbirhossain-dev/booknook-frontend.git
```

### Step 2: Navigate to the Project Folder

```bash
cd booknook-frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory and configure the required environment variables.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Use the actual credentials from your authentication and backend configuration. Never commit secret keys or credentials to GitHub.

### Step 5: Start the Development Server

```bash
npm run dev
```

### Step 6: Open in Browser

Visit:

```text
http://localhost:3000
```

---

## 🖥️ Backend Repository

The backend application is maintained separately using Express.js and MongoDB.

**Backend GitHub Repository:**

https://github.com/sabbirhossain-dev/booknook-backend

To run the backend locally:

```bash
git clone https://github.com/sabbirhossain-dev/booknook-backend.git
cd booknook-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

The backend API will run at:

```text
http://localhost:5000
```

---

## 👨‍💻 Author

**Sabbir Hossain**

- GitHub: https://github.com/sabbirhossain-dev
- Frontend Repository: https://github.com/sabbirhossain-dev/booknook-frontend
- Backend Repository: https://github.com/sabbirhossain-dev/booknook-backend

---

## 📄 License

This project was developed for educational purposes as an online library management application.

---

<p align="center">
  <strong>📚 BookNook – Discover Books, Share Knowledge, and Enjoy Reading!</strong>
</p>
