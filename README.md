# Wanderlust

A dynamic travel booking web application that allows users to discover, review, and book travel listings. Built with Node.js, Express.js, MongoDB, EJS, and Bootstrap, Wanderlust demonstrates a full-stack MVC architecture, secure user authentication, image uploads with Cloudinary, and interactive maps via Mapbox.

---

## 🔗 Live Demo

https://wanderlust-f3ni.onrender.com

---

## 🚀 Features

- **User Authentication**  
  Sign up, log in, and secure sessions (Passport.js & express-session)
- **CRUD Listings**  
  Create, read, update, and delete travel listings
- **Image Uploads**  
  Multer + Cloudinary integration for listing photos
- **Interactive Maps**  
  Geocoding with Mapbox SDK & embedded maps in listing pages
- **Reviews**  
  Users can leave reviews on listings
- **Role-based Access**  
  Only listing owners can edit or delete their listings
- **Data Validation**  
  Joi schemas to validate all incoming form data
- **Error Handling**  
  Custom ExpressError class + global error middleware
- **Responsive UI**  
  EJS templates styled with Bootstrap and ejs-mate layouts

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas, Mongoose  
- **Authentication:** Passport.js, passport-local, express-session, connect-mongo  
- **File Uploads:** Multer, multer-storage-cloudinary, Cloudinary  
- **Maps & Geocoding:** @mapbox/mapbox-sdk, Mapbox GL JS  
- **Validation:** Joi  
- **Templating:** EJS, ejs-mate  
- **Styling:** Bootstrap, custom CSS  
- **Deployment:** Render (backend)

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 14.x  
- A MongoDB Atlas account (free tier)  
- A Cloudinary account for image hosting  
- A Mapbox account for maps & geocoding
=======
### Installation
------------------
1. **Clone the repo**  
   ```bash
   git clone https://github.com/ApshCode03/wanderlust-project.git
   cd wanderlust-project
2. **Install dependencies**
   ```bash
   npm install
3. **Create a .env file in the project root with these keys:**
   ```bash
   MONGO_URI=YOUR_ATLAS_URI            # e.g. mongodb+srv://user:pw@cluster0.mongodb.net/test?retryWrites=true&w=majority
   SECRET=yourSessionSecret
   CLOUD_NAME=yourCloudinaryCloudName
   CLOUD_API_KEY=yourCloudinaryApiKey
   CLOUD_API_SECRET=yourCloudinaryApiSecret
   MAP_TOKEN=yourMapboxAccessToken
4. **Running Locally**
   ```bash
   npm run dev    # if you have nodemon configured
   # or
   node app.js
The app will start on https://wanderlust-f3ni.onrender.com/ and redirect to /listings.

----
## 🤝 Collaborators

- [@ApshCode03](https://github.com/ApshCode03) – Deployed the wanderlust on Render after resolving the backend issues like cloudinary image upload
- [@Bharat-Kokcha](https://github.com/bharat-kokcha) – Backend, database setup, image upload

## 🚀 My Contributions

- Set up Cloudinary integration
- Handled user registration and login routes
- Connected the project to MongoDB Atlas
- Wrote RESTful APIs for campgrounds


