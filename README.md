# 🌍 Wanderlast — Airbnb-Inspired Travel & Tour Booking App  

**Wanderlast** is a full-stack travel and tour booking platform inspired by Airbnb.  
It allows users to create, browse, and book travel destinations, leave reviews, and manage listings — all wrapped in a secure, responsive, and modern UI.  

🔗 **Live Demo:** [Stayverse on Render](https://stayverse-w2lg.onrender.com/listings)  

---

## ✨ Features  

### 🔐 Authentication & Authorization  
- Secure signup/login using **Passport.js** with password hashing via **bcrypt**  
- Session management using **express-session** and **cookie-parser**  
- Protected routes — only logged-in users can create, edit, or delete listings and reviews  

### 📦 Listings & Bookings  
- Add, view, update, and delete travel listings  
- Each listing includes **title, image, description, price, and location**  
- Integrated booking form with **date and guest selection**  
- Only the listing owner can modify their own listings  

### 📝 Reviews  
- Users can add reviews and ratings to listings  
- Only the review author can delete their own reviews  

### 🧾 Validation & Security  
- Frontend validation with **Bootstrap**  
- Backend validation using **Joi**  
- API keys and sensitive credentials securely stored in `.env`  

### ☁️ Image Uploads  
- Image hosting and storage with **Cloudinary**  

### 🎨 User Interface  
- Clean, responsive design with **Bootstrap**  
- Airbnb-inspired **card-based layout** and minimalist icons  
- Smooth UI transitions and animations  

### 🧩 Structured Codebase  
- Built with **MVC architecture** (Models, Views, Controllers)  
- Organized folders for routes, controllers, models, and views  
- Map integration for displaying locations  

---

## 🛠️ Tech Stack  

| Category       | Technology                          |
|----------------|-------------------------------------|
| Frontend       | HTML, CSS, JavaScript, EJS Templates |
| Styling        | Bootstrap / Custom CSS              |
| Backend        | Node.js, Express.js                 |
| Database       | MongoDB (Mongoose ODM)              |
| Authentication | Passport.js, bcrypt, express-session |
| Validation     | Joi                                 |
| File Storage   | Cloudinary                          |
| Hosting        | Render                              |

---

## 🚀 Getting Started (Local Development)  

Follow these steps to run the project locally:  

```bash
# 1. Clone the repository
git clone https://github.com/anulekha305/wanderlast.git
cd wanderlast

# 2. Install dependencies
npm install

# 3. Create a .env file in the root directory with your environment variables:
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret

# 4. Start the server
npm start

# The app will run on:
# http://localhost:5000
