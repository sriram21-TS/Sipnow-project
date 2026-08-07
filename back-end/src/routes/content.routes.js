const { Router } = require("express");
const {
  getCategories,
  getFooterColumns,
  getHeroSlides,
  getInStorePromotions,
  getNavMenus,
  getQuiz,
  getSiteAssets,
} = require("../controllers/content.controller");

const router = Router();

router.get("/categories", getCategories);
router.get("/footer-columns", getFooterColumns);
router.get("/hero-slides", getHeroSlides);
router.get("/in-store-promotions", getInStorePromotions);
router.get("/nav-menus", getNavMenus);
router.get("/quiz", getQuiz);
router.get("/site-assets", getSiteAssets);

module.exports = router;
