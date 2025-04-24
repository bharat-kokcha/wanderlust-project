// 🚀 Load environment variables in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// Allows PUT & DELETE via forms (`?_method=DELETE`)
const methodOverride = require("method-override");
// EJS layout support
const ejsMate = require("ejs-mate");
// Custom error class
const ExpressError = require("./utils/ExpressError.js");
// Session management & store
const session = require("express-session");
const MongoStore = require("connect-mongo");
// Flash messages
const flash = require("connect-flash");
// Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Route files
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Use ATLASDB_URL (in production) or MONGO_URI (fallback)
const dbUrl = process.env.ATLASDB_URL || process.env.MONGO_URI;

/** ── Database Connection ─────────────────────────────────────────── */
main()
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

async function main() {
  await mongoose.connect(dbUrl);
}

/** ── View Engine & Static Assets ────────────────────────────────── */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/** ── Body Parsing & Method Override ──────────────────────────────── */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/** ── Session Store Configuration ────────────────────────────────── */
const store = MongoStore.create({
  mongoUrl: dbUrl,                 // use same DB for sessions
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600           // lazy session update
});
store.on("error", err => console.error("SESSION STORE ERROR", err));

app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // 7 days
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

/** ── Flash Messages ───────────────────────────────────────────────── */
app.use(flash());

/** ── Passport (Authentication) Setup ─────────────────────────────── */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/** ── Make Flash & Current User Available in All Templates ───────── */
app.use((req, res, next) => {
  res.locals.success = req.flash("success");   // for success messages
  res.locals.error   = req.flash("error");     // for error messages
  res.locals.currUser = req.user;              // who’s logged in (if any)
  next();
});

/** ── Mount Routes ────────────────────────────────────────────────── */
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

/** ── Redirect Root Path to Listings ──────────────────────────────── */
app.get("/", (req, res) => {
  res.redirect("/listings");
});

/** ── 404 Catch-all ────────────────────────────────────────────────── */
// If no route matched, this middleware runs
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

/** ── Global Error Handler ────────────────────────────────────────── */
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error", { message });
});

/** ── Start Server ────────────────────────────────────────────────── */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
