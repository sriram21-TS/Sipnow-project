require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Category = require("../models/Category");
const FooterColumn = require("../models/FooterColumn");
const HeroSlide = require("../models/HeroSlide");
const InStorePromotion = require("../models/InStorePromotion");
const NavMenu = require("../models/NavMenu");
const QuizQuestion = require("../models/QuizQuestion");
const QuizResult = require("../models/QuizResult");
const SiteAsset = require("../models/SiteAsset");
const {
  siteAssets,
  categories,
  footerColumns,
  heroSlides,
  inStorePromotions,
  navMenus,
  quizQuestions,
  quizResults,
} = require("./content.data");

async function seed() {
  await connectDB();

  await Promise.all([
    SiteAsset.deleteMany({}),
    Category.deleteMany({}),
    FooterColumn.deleteMany({}),
    HeroSlide.deleteMany({}),
    InStorePromotion.deleteMany({}),
    NavMenu.deleteMany({}),
    QuizQuestion.deleteMany({}),
    QuizResult.deleteMany({}),
  ]);

  await Promise.all([
    SiteAsset.insertMany(siteAssets),
    Category.insertMany(categories),
    FooterColumn.insertMany(footerColumns),
    HeroSlide.insertMany(heroSlides),
    InStorePromotion.insertMany(inStorePromotions),
    NavMenu.insertMany(navMenus),
    QuizQuestion.insertMany(quizQuestions),
    QuizResult.insertMany(quizResults),
  ]);

  console.log("Seeded site content collections.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
