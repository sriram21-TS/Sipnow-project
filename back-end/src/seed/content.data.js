// Transcribed from front-end/src/data/*.js. Local asset imports (jacob-greek,
// campo, cooper) point at the same backend-relative paths already served for
// products (see products.data.js) instead of bundler-resolved image imports.

const BEER_FEATURED_URL =
  "https://lh3.googleusercontent.com/aida/AP1WRLumnwRbPmAbWR1WbU6c85EIvxQkUlJwPYBvDYs43oD3f0Kz-4cZM9ylIJL7JHg11vmzJ3u0_Op2Dt48MC0A_dduSt59UdiYoyxuKKKHgJgEk8QK3omKf34s5oHdJwilIZ9lXnwbsynJD01n8XbDDps6cYf6GeYUd1TmPjlCnnaFAhI3ihD_OjjI55SF_EPQvCpnS11RsIhPp8JTYvEqgfnf5PIc5cWbsgBGsRfdWgoAfam14sSNPtbBknc";
const WINE_FEATURED_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC088VleZnC5n9ymB8EfMx2mZsCuij7vJQoCBDSrP9nqCNq-a--DAFOc1REaefOJsPneORPheQ8z7EPCuwxb8Lz9hykvFrgw8yYTcObhmVzLYTwNowthQwnqVMN1wuZeqWPDdYxJYGOCNGH6wpUs-7vkWqGO1hB8dWCn_Uiv1nB6O_syyoYeY8WMIRuhJsRvUWMJqPysyf-SUeFU_bUrumt_GfGmGdDaMDM9_9BBW7-lTfX4A-vNGLDdlc_Pagge_okayzaDkgtzro";
const SPIRITS_FEATURED_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDhvgfMna-JG7lXUhGilp-9yIvdIG9L7sIDtmagNkmAlL8H1jD4p01B8MKrsoq2wTTJPfc3ktZJWDYPLydSeci15xrg3BWCd1aoXhdBI-W5YaOlra2M7nCEs-kfNabwhM0I4qjeJ44eC79CKpaUNxfrceQfvG8nb86hVC_-KN8b2v_FA3_dXPg9JvJN2qGE3BF-OhKmt9FK3npGWnEWByOZ_4u-rype5mDDvHxmbmcEu8ITEGBfQZgwnkmbvokQhH2sVfua1p3K4qk";
const ZERO_PROOF_URL =
  "https://lh3.googleusercontent.com/aida/AP1WRLvP_l-H35B2XMPGRe7rcFDxV-ucpt9A-IcSEQadx9mZSqUt7p19lsXt8xtrgY6bHSwpdNRL7j1l5TRb_-m02AQo3DcBu1J3ybhFCT3EYfRxVJ4dKOY6dcHAYLRXuzpQw4Wvd9GpXiKK-7yi2ql1qtyQnAycMJ69zIGweZks6n-viY3NfgOrHxpaVA51AKAg5WxV8zJbKSw3jFEU4xtjbeH3AwGSRmsE8VADCvrk5BN3xKOL9LB9E3ccHrw";
const CELLAR_HIGHLIGHT_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBjg2JYE5swzAmBLfew8lgcYh6ckVc36zj78xi9DJj4su-OyRZ3vxul2owL82NSh82LJJBvLJne4vtuNIGQq_7RFcnO7LQZjBLA0C6Kkhlhu0W02fDXTm4VJLmyq8AyVIXLsIbmcObQyrHvEFj9tR1Jfhq7iEe2gR4BltMNdfv2y2XbD-2YGwn6SdW4mBuakAQLTX8DtUXx4Aw-YWEmREZO78MaWrYvAJMB_4FcgqInUcsjOaJYqkWjPIiL18yDw6Icn4xnAjtnYaQ";
const PENFOLDS_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCmZThYcvGfX5gfiqiMSTPE1PHqBM4xWdCH5x-_BxzCd_FbiWoenUboNIT63ADkPkjCGciU5ZOtb7idVQotov-gO45l5cp0nHplzPD-RfITaIlARPuwJqEjol-T2lP6y1Z8pEnsO2jjZHGaMYRSgAR63FFwA18vScucDmg_NhQsce6RGW_FIm9Zda_u20dO7xptB5hS_uUKUWKtoNvlFavOEQTkioWy1UItby_1dPV7Q4oRcW8XGg0c_Q3J5erk6hhssj5H-C5ULho";
const YAMAZAKI_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAC_wPeOSA2g4B0Ujwm2CDSPXtHi2u4cUt3PFeenWWAKBRkU6E9ML0AV-s9Wf5UY1TD0r-LeUMpqhT6cwLSSzUBU2cGOhMaSs9ZJOLYNuxJVF5BeX077Zz4gDMf9XoQk4p8bS5rHJ9BRDAg416L1Wv-fZLC5jVBX-R7p3xmKdKiWNifd31Xk-aqT9Xg22ci8MzAVcD9P5UrPXYN1BL0b5aIPen9ZfOv4htbUWhKMVhtFndApvmbX3ITYD61rtOwT3MHhQU4AgXd_vk";
const PRESTIGE_COLLECTION_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDaw1mUTvg2Opc2VIHqIRzcxWex9CznO6Z-cpJAjD5F24P33mKnq9kjDRycSE3SN6lYV7IYl1KEQCAKRgneP0tlRGQmgwKc5vfuXZCMyh0CQrYE13M_gRrMl20vd5IJWFF0qSFC1swa_hf7rje2ez7ct2G9z88oM5sxOU1rdqs3ghTtfAXXZ-KUjGrgVwlJVmovV0XQsF69ku7st3vyONyug_8CadSo6q4DQw4tUuA3Ou-MAJeCj3GTZNnqcTGwJTx6_aDffMKTs2A";
const LOGO_URL =
  "https://lh3.googleusercontent.com/aida/AP1WRLsSmFBBF0536R4l4HB29SUykDMUwNMnYj1hoS4_KkXkhXs3O_IYnSjqvOqxkEJEicS6wD4GoTIU0KgLGOXTnIhve8BMlXmxn_u_xBQT4fWKtPa-DF5iQf5oznl8Slu5mfbxBVzBtjOEjMmu_dAxHhdNNoEhZonYmz2Q-A8KMDULXpE406Qme32OEsXuCSXxQH7kpcJxixmCxVVd8HUYY8kdnmCK8qQnNuS5CtpqjlIwMnK2ik4qaebgIQ";

const PREMIX_IMAGE = "/assets/products/cooper.png";
const JACOB_GREEK_IMAGE = "/assets/products/jacob-greek.png";
const CAMPO_IMAGE = "/assets/products/campo.png";
const COOPER_IMAGE = "/assets/products/cooper.png";

const siteAssets = [
  { key: "LOGO_URL", url: LOGO_URL },
  { key: "BEER_FEATURED_URL", url: BEER_FEATURED_URL },
  { key: "WINE_FEATURED_URL", url: WINE_FEATURED_URL },
  { key: "SPIRITS_FEATURED_URL", url: SPIRITS_FEATURED_URL },
  { key: "ZERO_PROOF_URL", url: ZERO_PROOF_URL },
  { key: "CELLAR_HIGHLIGHT_URL", url: CELLAR_HIGHLIGHT_URL },
  { key: "PENFOLDS_URL", url: PENFOLDS_URL },
  { key: "YAMAZAKI_URL", url: YAMAZAKI_URL },
  { key: "PRESTIGE_COLLECTION_URL", url: PRESTIGE_COLLECTION_URL },
];

const categories = [
  { key: "beer", name: "Beer", tag: "Artisanal & Craft", image: BEER_FEATURED_URL, order: 0 },
  { key: "wine", name: "Wine", tag: "Old World Classics", image: WINE_FEATURED_URL, order: 1 },
  { key: "spirits", name: "Spirits", tag: "Global Selection", image: SPIRITS_FEATURED_URL, order: 2 },
  { key: "zero-proof", name: "Zero Proof", tag: "Mindful Excellence", image: ZERO_PROOF_URL, order: 3 },
  { key: "premix", name: "Premix", tag: "Ready to Pour", image: PREMIX_IMAGE, order: 4 },
];

const footerColumns = [
  {
    heading: "Explore",
    links: ["All Collections", "Rare Vintage", "Limited Edition", "New Arrivals"],
    order: 0,
  },
  {
    heading: "Concierge",
    links: ["Shipping Info", "Contact Support", "Returns & Refunds", "Sommelier Service"],
    order: 1,
  },
];

const heroSlides = [
  {
    bgImage: CELLAR_HIGHLIGHT_URL,
    bgAlt: "Rare vintage wine cellar",
    badge: "Rare Vintage Selection",
    titleLines: ["Elevate Your", "Midnight Hour."],
    description:
      "Curated excellence from the world's most prestigious cellars, delivered with artisanal precision to your doorstep.",
    primaryCta: "Explore Collections",
    secondaryCta: "Rare Finds",
    card: { image: CELLAR_HIGHLIGHT_URL, tag: "Cellar Highlight", title: "Vintage Krug Selection" },
    order: 0,
  },
  {
    bgImage: WINE_FEATURED_URL,
    bgAlt: "Old world red wine",
    badge: "Old World Classics",
    titleLines: ["Uncork The", "Finest Reserve."],
    description:
      "Benchmark wines from a legacy that began in 1844 — handpicked vintages with a spirit of innovation and quality.",
    primaryCta: "Shop Wine Collection",
    secondaryCta: "View Cellar",
    card: { image: PENFOLDS_URL, tag: "Best Seller · $135.00", title: "Penfolds St Henri Shiraz" },
    order: 1,
  },
  {
    bgImage: SPIRITS_FEATURED_URL,
    bgAlt: "Global spirits selection",
    badge: "Global Spirits Selection",
    titleLines: ["Discover Rare", "Single Malts."],
    description:
      "From Japanese craftsmanship to Scottish tradition — an exceptional spirits collection for the discerning palate.",
    primaryCta: "Shop Spirits",
    secondaryCta: "Find Rare Malts",
    card: { image: YAMAZAKI_URL, tag: "Rare Single Malt · $289.00", title: "Yamazaki 12 Year Old" },
    order: 2,
  },
  {
    bgImage: BEER_FEATURED_URL,
    bgAlt: "Craft beer collection",
    badge: "Artisanal & Craft",
    titleLines: ["Cool Down With", "Craft Perfection."],
    description:
      "Independent brewers, bold flavours, small batches — the season's most awarded craft beer, curated for you.",
    primaryCta: "Shop Craft Beer",
    secondaryCta: "View Range",
    card: { image: PRESTIGE_COLLECTION_URL, tag: "Seasonal Curations", title: "2024 Prestige Collection" },
    order: 3,
  },
];

const inStorePromotions = [
  {
    image: COOPER_IMAGE,
    icon: "sports_bar",
    badgeText: "20% Off",
    category: "Beer · 750mL",
    name: "Coopers Original Pale Ale Longneck",
    rating: 4.2,
    reviewCount: 94,
    originalPrice: "$6.09",
    price: "$4.87",
    promoLabel: "In-store only",
    order: 0,
  },
  {
    image: JACOB_GREEK_IMAGE,
    icon: "wine_bar",
    badgeText: "15% Off",
    category: "White Wine · 750mL",
    name: "Jacob's Creek Cool Harvest Sauvignon Blanc",
    rating: 4.5,
    reviewCount: 128,
    originalPrice: "$10.13",
    price: "$8.61",
    promoLabel: "In-store only",
    order: 1,
  },
  {
    image: CAMPO_IMAGE,
    icon: "wine_bar",
    badgeText: "10% Off",
    category: "Red Wine · 750mL",
    name: "Campo Viejo Tempranillo",
    rating: 4.0,
    reviewCount: 76,
    originalPrice: "$12.57",
    price: "$11.31",
    promoLabel: "In-store only",
    order: 2,
  },
  {
    image: "https://media.sipnow.com.au/sipnow/products/GUEST_e307542d-1e91-4688-859b-9bbb0a78b3ce__1_.jpg",
    icon: "liquor",
    badgeText: "Bundle Deal",
    category: "Vodka · 6 x 200mL",
    name: "Absolut Vodka 6 Pack",
    rating: 5.0,
    reviewCount: 203,
    originalPrice: "$17.98",
    price: "$14.99",
    promoLabel: "In-store only",
    order: 3,
  },
  {
    image: "https://media.sipnow.com.au/sipnow/products/001.webp",
    icon: "liquor",
    badgeText: "25% Off",
    category: "Whiskey · 10 x 375mL",
    name: "Jim Beam Double Serve 6.7%",
    rating: 4.6,
    reviewCount: 57,
    originalPrice: "$5.22",
    price: "$3.92",
    promoLabel: "In-store only",
    order: 4,
  },
  {
    image: "https://media.sipnow.com.au/sipnow/products/901870-1.png",
    icon: "wine_bar",
    badgeText: "Buy 2 Save 10%",
    category: "Red Wine · 750mL",
    name: "Grant Burge Miamba Shiraz",
    rating: 4.7,
    reviewCount: 145,
    originalPrice: "$15.51",
    price: "$13.96",
    promoLabel: "In-store only",
    order: 5,
  },
];

const navMenus = [
  {
    label: "Offers & Services",
    columns: [
      { heading: "Shop All", items: [] },
      { heading: "In-Store promotions", items: [] },
      { heading: "General promotions", items: [] },
      { heading: "Gift Cards", items: [] },
      { heading: "Members", items: [] },
      { heading: "Clearance", items: [] },
    ],
    order: 0,
  },
  {
    label: "Beer & Cider",
    columns: [
      { heading: "Lager", items: ["Pilsner", "Dark Lager", "Helles"] },
      { heading: "Ale", items: ["Pale Ale", "IPA", "Stout & Porter"] },
      { heading: "Cider", items: ["Apple", "Pear", "Fruit Cider"] },
    ],
    featured: { type: "image", image: BEER_FEATURED_URL, tag: "Featured Craft", title: "Balter XPA Collection" },
    order: 1,
  },
  {
    label: "Premix",
    columns: [
      { heading: "Vodka Mixers", items: ["Hard Seltzer", "Lemonade"] },
      { heading: "Dark Spirits", items: ["Whiskey & Cola", "Rum & Ginger"] },
      { heading: "Cocktails", items: ["Margarita", "Espresso Martini"] },
    ],
    featured: { type: "icon", icon: "auto_awesome", tag: "Summer Hits", title: "Ready-to-drink Classics" },
    order: 2,
  },
  {
    label: "Spirits",
    columns: [
      {
        heading: "Spirits",
        items: ["Gin", "Rum", "Vodka", "Bourbon", "Tequilla", "Liquerus", "Brandy & cognac", "Other Spirits"],
      },
      {
        heading: "Whisky",
        items: [
          "Other Whisky",
          "Scotch Whisky",
          "Japanese Whisky",
          "Irish Whisky",
          "American Whisky",
          "Austrialian Whisky",
        ],
      },
    ],
    featured: { type: "image-only", image: WINE_FEATURED_URL },
    order: 3,
  },
  {
    label: "Wine",
    columns: [
      {
        heading: "RED WINE",
        items: [
          "Shiraz",
          "Cabernet Sauvignon",
          "Pinot Noir",
          "Rosé",
          "Red Blends",
          "Merlot",
          "Cabernet Merlot",
          "Shiraz Cabernet",
          "Grenache",
          "Other Red Wine",
        ],
      },
      {
        heading: "WHITE WINE",
        items: [
          "Chardonnay",
          "Sauvignon Blanc",
          "Pinot Grigio",
          "Riesling",
          "Semillon Sauv Blanc",
          "Moscato",
          "Other White Wine",
        ],
      },
      {
        heading: "SPARKLING WINE",
        items: ["Champagne", "Prosecco", "Sparkling White Wine", "Sparkling Rose Wine", "Other Sparkling Wine"],
      },
      { heading: "Other Wine", items: ["Fortified Wine", "Zero%* Alcohol Wine*"] },
    ],
    featured: { type: "icon", icon: "auto_awesome", tag: "Summer Hits", title: "Ready-to-drink Classics" },
    order: 4,
  },
];

const quizQuestions = [
  {
    question: "What's the occasion?",
    options: [
      { label: "Casual Night In", icon: "home", scores: { beer: 2, zeroproof: 1 } },
      { label: "Celebration", icon: "celebration", scores: { wine: 2, spirits: 1 } },
      { label: "Dinner Party", icon: "restaurant", scores: { wine: 2, premix: 1 } },
      { label: "Just Because", icon: "sunny", scores: { premix: 2, beer: 1 } },
    ],
    order: 0,
  },
  {
    question: "Pick your flavour profile.",
    options: [
      { label: "Crisp & Refreshing", icon: "water_drop", scores: { beer: 2, zeroproof: 1 } },
      { label: "Bold & Intense", icon: "local_fire_department", scores: { spirits: 2, wine: 1 } },
      { label: "Smooth & Mellow", icon: "nightlight", scores: { wine: 2, spirits: 1 } },
      { label: "Sweet & Fruity", icon: "eco", scores: { premix: 2, zeroproof: 1 } },
    ],
    order: 1,
  },
  {
    question: "How adventurous are you feeling?",
    options: [
      { label: "Classic & Familiar", icon: "workspace_premium", scores: { beer: 1, wine: 1 } },
      { label: "Something New", icon: "explore", scores: { premix: 2, spirits: 1 } },
      { label: "Rare & Prestigious", icon: "diamond", scores: { spirits: 2, wine: 2 } },
      {
        label: "Surprise Me",
        icon: "shuffle",
        scores: { zeroproof: 1, beer: 1, wine: 1, spirits: 1, premix: 1 },
      },
    ],
    order: 2,
  },
  {
    question: "Any preference on strength?",
    options: [
      { label: "Light", icon: "filter_1", scores: { beer: 1, zeroproof: 2 } },
      { label: "Medium", icon: "filter_2", scores: { wine: 2, premix: 1 } },
      { label: "Strong", icon: "filter_3", scores: { spirits: 2 } },
      { label: "No Preference", icon: "all_inclusive", scores: {} },
    ],
    order: 3,
  },
];

const quizResults = [
  {
    key: "beer",
    title: "Beer & Cider",
    desc: "Independent brewers, bold flavours, small batches — you're a craft beer and cider person through and through.",
  },
  {
    key: "wine",
    title: "Wine",
    desc: "From bold reds to crisp whites, a curated cellar selection of old-world classics awaits your palate.",
  },
  {
    key: "spirits",
    title: "Spirits",
    desc: "Rare single malts and global spirits — you appreciate craftsmanship in every pour.",
  },
  {
    key: "premix",
    title: "Premix",
    desc: "Ready-to-drink classics for every occasion — vibrant, easy, and always a good time.",
  },
  {
    key: "zeroproof",
    title: "Zero Proof",
    desc: "Mindful excellence without compromise — refreshing options for every moment.",
  },
];

module.exports = {
  siteAssets,
  categories,
  footerColumns,
  heroSlides,
  inStorePromotions,
  navMenus,
  quizQuestions,
  quizResults,
};
