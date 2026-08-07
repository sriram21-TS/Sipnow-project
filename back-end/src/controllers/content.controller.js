const Category = require("../models/Category");
const FooterColumn = require("../models/FooterColumn");
const HeroSlide = require("../models/HeroSlide");
const InStorePromotion = require("../models/InStorePromotion");
const NavMenu = require("../models/NavMenu");
const QuizQuestion = require("../models/QuizQuestion");
const QuizResult = require("../models/QuizResult");
const SiteAsset = require("../models/SiteAsset");

async function getCategories(req, res) {
  const categories = await Category.find().sort({ order: 1 });
  res.json({ categories });
}

async function getFooterColumns(req, res) {
  const footerColumns = await FooterColumn.find().sort({ order: 1 });
  res.json({ footerColumns });
}

async function getHeroSlides(req, res) {
  const heroSlides = await HeroSlide.find().sort({ order: 1 });
  res.json({ heroSlides });
}

async function getInStorePromotions(req, res) {
  const inStorePromotions = await InStorePromotion.find().sort({ order: 1 });
  res.json({ inStorePromotions });
}

async function getNavMenus(req, res) {
  const navMenus = await NavMenu.find().sort({ order: 1 });
  res.json({ navMenus });
}

async function getQuiz(req, res) {
  const [questions, results] = await Promise.all([
    QuizQuestion.find().sort({ order: 1 }),
    QuizResult.find(),
  ]);
  const quizResults = {};
  results.forEach((result) => {
    quizResults[result.key] = { title: result.title, desc: result.desc };
  });
  res.json({ quizQuestions: questions, quizResults });
}

async function getSiteAssets(req, res) {
  const assets = await SiteAsset.find();
  const siteAssets = {};
  assets.forEach((asset) => {
    siteAssets[asset.key] = asset.url;
  });
  res.json({ siteAssets });
}

module.exports = {
  getCategories,
  getFooterColumns,
  getHeroSlides,
  getInStorePromotions,
  getNavMenus,
  getQuiz,
  getSiteAssets,
};
