# 🚌 StudExpress

StudExpress is a full-stack, two-sided marketplace designed to streamline campus and inter-city transportation for students. It connects verified transport providers with students, allowing providers to list available trips and students to seamlessly search, compare, and book seats in seconds.

Built as a 1-week Agile MVP sprint.

## 🌟 Features

### 👨‍🎓 Student Features
*   **Secure Authentication:** Register and log in as a Student.
*   **Browse Trips:** View a paginated list of available trips with provider details, ratings, and amenities.
*   **Smart Booking Flow:** Click "Book Now" to open a modal with trip summaries, passenger details forms, and dynamic price breakdowns.
*   **Seat Availability:** Real-time updates on available seats (with atomic database locking to prevent overbooking).
*   **Booking Success:** Receive a confirmation screen upon successful booking.

### 🚐 Transport Provider Features
*   **Provider Dashboard:** Register and log in as a Transport Provider.
*   **Add Trips:** A clean, validated form to add new trips (departure, destination, price, vehicle type, comfort style, etc.).
*   **My Trips:** View a dashboard of all created trips.
*   **Analytics Snapshot:** See the total number of trips created and the total number of students booked across all trips.
*   **Live Seat Tracking:** Monitor how many seats are left versus the total capacity.

## 🛠️ Tech Stack

**Frontend:**
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State/Data Fetching:** TanStack Query (React Query)
*   **Form Handling:** React Hook Form + Zod (Validation)
*   **Icons:** Lucide React
*   **Notifications:** React Hot Toast

**Backend:**
*   **Environment:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB Atlas
*   **ODM:** Mongoose
*   **Authentication:** JSON Web Tokens (JWT) & bcryptjs

**Deployment:**
*   **Frontend:** Vercel
*   **Backend:** Render

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the project locally on your machine.

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB Atlas account (or a local MongoDB instance)
*   Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/studexpress.git
cd studexpress