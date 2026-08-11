import jacobGreek from "../assets/products/jacob-greek.png";
import campo from "../assets/products/campo.png";
import cooper from "../assets/products/cooper.png";

export const products = [
  // =====================================================
  // WINE
  // =====================================================

  {
    image: jacobGreek,
    badgeStyle: "glow",
    icon: "wine_bar",
    badgeText: "Best in White Wine",

    category: "White Wine · 750mL",
    categoryGroup: "wine",
    type: "Sauvignon Blanc",

    name: "Jacob's Creek Cool Harvest Sauvignon Blanc",

    rating: 4.5,
    reviewCount: 128,
    price: "$10.13",
  },

  {
    image: campo,
    badgeStyle: "glow",
    icon: "wine_bar",
    badgeText: "Best in Red Wine",

    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    type: "Other Red Wine",

    name: "Campo Viejo Tempranillo",

    rating: 4.0,
    reviewCount: 76,
    price: "$12.57",
  },

  // =====================================================
  // VODKA
  // =====================================================

  {
    image:
      "https://media.sipnow.com.au/sipnow/products/GUEST_e307542d-1e91-4688-859b-9bbb0a78b3ce__1_.jpg",

    badgeStyle: "glow",
    icon: "liquor",
    badgeText: "Best in Vodka",

    category: "Vodka · 6 x 200mL",
    categoryGroup: "spirits",
    type: "Vodka",

    name: "Absolut Vodka 6 Pack",

    rating: 5.0,
    reviewCount: 203,
    price: "$17.98",
  },

  // =====================================================
  // BEER
  // =====================================================

  {
    image: cooper,
    badgeStyle: "glow",
    icon: "sports_bar",
    badgeText: "Best in Beer",

    category: "Beer · 750mL",
    categoryGroup: "beer",
    type: "Pale Ale",

    name: "Coopers Original Pale Ale Longneck",

    rating: 4.2,
    reviewCount: 94,
    price: "$6.09",
  },

  // =====================================================
  // BOURBON / WHISKEY
  // =====================================================

  {
    image: "https://media.sipnow.com.au/sipnow/products/001.webp",

    badgeStyle: "glow",
    icon: "liquor",
    badgeText: "Best in Bourbon",

    category: "Bourbon · 375mL",
    categoryGroup: "spirits",
    type: "Bourbon",

    name: "Jim Beam Double Serve 6.7%",

    rating: 4.6,
    reviewCount: 57,
    price: "$5.22",
  },

  // =====================================================
  // WINE
  // =====================================================

  {
    image: "https://media.sipnow.com.au/sipnow/products/180729-1.webp",

    badgeStyle: "plain",
    badgeText: "Best in Sparkling",

    category: "Sparkling · 750mL",
    categoryGroup: "wine",
    type: "Other White Wine",

    name: "Chandon Garden Spritz",

    rating: 4.9,
    reviewCount: 312,
    price: "$27.73",
  },

  // =====================================================
  // BEER
  // =====================================================

  {
    image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",

    badgeStyle: "plain",
    badgeText: "Best in Beer",

    category: "Beer · 355mL",
    categoryGroup: "beer",
    type: "Lager",

    name: "Byron Bay Brewery Premium Lager",

    rating: 4.1,
    reviewCount: 68,
    price: "$2.83",
  },

  // =====================================================
  // WINE
  // =====================================================

  {
    image: "https://media.sipnow.com.au/sipnow/products/901870-1.png",

    badgeStyle: "plain",
    badgeText: "Best in Red Wine",

    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    type: "Shiraz",

    name: "Grant Burge Miamba Shiraz",

    rating: 4.7,
    reviewCount: 145,
    price: "$15.51",
  },

  {
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600",

    badgeStyle: "plain",
    badgeText: "Best in Red Wine",

    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    type: "Red Blends",

    name: "19 Crimes Red Blend",

    rating: 4.3,
    reviewCount: 89,
    price: "$31.99",
  },

  {
    image:
      "https://www.edsfinewines.com/wp-content/uploads/2021/02/Penfolds-Bin-600.jpg",

    badgeStyle: "plain",
    badgeText: "Best in Red Wine",

    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    type: "Shiraz",

    name: "Pepperjack Shiraz",

    rating: 4.3,
    reviewCount: 89,
    price: "$31.99",
  },

  // =========================
  // TEMPORARY PILSNER PRODUCTS
  // =========================
  {
    image: cooper,
    badgeStyle: "glow",
    icon: "sports_bar",
    badgeText: "Pilsner",
    category: "Pilsner · 355mL",
    categoryGroup: "beer",
    name: "Classic Pilsner",
    rating: 4.5,
    reviewCount: 120,
    price: "$5.99",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 355mL",
    categoryGroup: "beer",
    name: "Golden Pilsner",
    rating: 4.3,
    reviewCount: 95,
    price: "$6.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 375mL",
    categoryGroup: "beer",
    name: "Premium Pilsner",
    rating: 4.6,
    reviewCount: 87,
    price: "$7.25",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 355mL",
    categoryGroup: "beer",
    name: "Crisp Pilsner",
    rating: 4.2,
    reviewCount: 76,
    price: "$5.75",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 375mL",
    categoryGroup: "beer",
    name: "European Pilsner",
    rating: 4.7,
    reviewCount: 142,
    price: "$8.25",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 355mL",
    categoryGroup: "beer",
    name: "Fresh Hop Pilsner",
    rating: 4.4,
    reviewCount: 63,
    price: "$6.95",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 375mL",
    categoryGroup: "beer",
    name: "Light Pilsner",
    rating: 4.1,
    reviewCount: 54,
    price: "$5.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 355mL",
    categoryGroup: "beer",
    name: "Craft Pilsner",
    rating: 4.8,
    reviewCount: 178,
    price: "$7.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 375mL",
    categoryGroup: "beer",
    name: "Australian Pilsner",
    rating: 4.5,
    reviewCount: 91,
    price: "$6.85",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 355mL",
    categoryGroup: "beer",
    name: "Heritage Pilsner",
    rating: 4.3,
    reviewCount: 68,
    price: "$7.15",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 375mL",
    categoryGroup: "beer",
    name: "Silver Pilsner",
    rating: 4.6,
    reviewCount: 103,
    price: "$8.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pilsner",
    category: "Pilsner · 355mL",
    categoryGroup: "beer",
    name: "Signature Pilsner",
    rating: 4.7,
    reviewCount: 134,
    price: "$7.99",
  },
  // =========================
  // DARK LAGER
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Dark Lager",
    category: "Dark Lager · 355mL",
    categoryGroup: "beer",
    name: "Classic Dark Lager",
    rating: 4.5,
    reviewCount: 80,
    price: "$6.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Dark Lager",
    category: "Dark Lager · 355mL",
    categoryGroup: "beer",
    name: "Rich Dark Lager",
    rating: 4.4,
    reviewCount: 72,
    price: "$6.99",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Dark Lager",
    category: "Dark Lager · 375mL",
    categoryGroup: "beer",
    name: "Premium Dark Lager",
    rating: 4.7,
    reviewCount: 91,
    price: "$7.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Dark Lager",
    category: "Dark Lager · 355mL",
    categoryGroup: "beer",
    name: "Smooth Dark Lager",
    rating: 4.3,
    reviewCount: 65,
    price: "$6.25",
  },

  // =========================
  // HELLES
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Helles",
    category: "Helles · 355mL",
    categoryGroup: "beer",
    name: "Classic Helles",
    rating: 4.5,
    reviewCount: 84,
    price: "$6.29",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Helles",
    category: "Helles · 355mL",
    categoryGroup: "beer",
    name: "Golden Helles",
    rating: 4.6,
    reviewCount: 76,
    price: "$6.79",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Helles",
    category: "Helles · 375mL",
    categoryGroup: "beer",
    name: "Premium Helles",
    rating: 4.7,
    reviewCount: 93,
    price: "$7.29",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Helles",
    category: "Helles · 355mL",
    categoryGroup: "beer",
    name: "Fresh Helles",
    rating: 4.3,
    reviewCount: 61,
    price: "$6.49",
  },

  // =========================
  // PALE ALE
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pale Ale",
    category: "Pale Ale · 355mL",
    categoryGroup: "beer",
    name: "Classic Pale Ale",
    rating: 4.5,
    reviewCount: 102,
    price: "$6.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pale Ale",
    category: "Pale Ale · 355mL",
    categoryGroup: "beer",
    name: "Golden Pale Ale",
    rating: 4.4,
    reviewCount: 87,
    price: "$6.99",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pale Ale",
    category: "Pale Ale · 375mL",
    categoryGroup: "beer",
    name: "Craft Pale Ale",
    rating: 4.7,
    reviewCount: 119,
    price: "$7.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pale Ale",
    category: "Pale Ale · 355mL",
    categoryGroup: "beer",
    name: "Fresh Pale Ale",
    rating: 4.3,
    reviewCount: 73,
    price: "$6.75",
  },

  // =========================
  // IPA
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "IPA",
    category: "IPA · 355mL",
    categoryGroup: "beer",
    name: "Classic IPA",
    rating: 4.6,
    reviewCount: 110,
    price: "$7.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "IPA",
    category: "IPA · 355mL",
    categoryGroup: "beer",
    name: "Hoppy IPA",
    rating: 4.7,
    reviewCount: 126,
    price: "$7.99",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "IPA",
    category: "IPA · 375mL",
    categoryGroup: "beer",
    name: "Craft IPA",
    rating: 4.8,
    reviewCount: 148,
    price: "$8.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "IPA",
    category: "IPA · 355mL",
    categoryGroup: "beer",
    name: "Tropical IPA",
    rating: 4.5,
    reviewCount: 94,
    price: "$7.75",
  },

  // =========================
  // STOUT & PORTER
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Stout & Porter",
    category: "Stout & Porter · 355mL",
    categoryGroup: "beer",
    name: "Classic Stout",
    rating: 4.6,
    reviewCount: 105,
    price: "$7.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Stout & Porter",
    category: "Stout & Porter · 355mL",
    categoryGroup: "beer",
    name: "Dark Porter",
    rating: 4.5,
    reviewCount: 89,
    price: "$7.25",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Stout & Porter",
    category: "Stout & Porter · 375mL",
    categoryGroup: "beer",
    name: "Premium Stout",
    rating: 4.8,
    reviewCount: 137,
    price: "$8.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Stout & Porter",
    category: "Stout & Porter · 355mL",
    categoryGroup: "beer",
    name: "Craft Porter",
    rating: 4.4,
    reviewCount: 71,
    price: "$7.75",
  },

  // =========================
  // APPLE CIDER
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Apple Cider",
    category: "Apple · 330mL",
    categoryGroup: "cider",
    name: "Classic Apple Cider",
    rating: 4.5,
    reviewCount: 92,
    price: "$5.99",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Apple Cider",
    category: "Apple · 330mL",
    categoryGroup: "cider",
    name: "Crisp Apple Cider",
    rating: 4.6,
    reviewCount: 105,
    price: "$6.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Apple Cider",
    category: "Apple · 375mL",
    categoryGroup: "cider",
    name: "Premium Apple Cider",
    rating: 4.7,
    reviewCount: 88,
    price: "$7.25",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Apple Cider",
    category: "Apple · 330mL",
    categoryGroup: "cider",
    name: "Fresh Apple Cider",
    rating: 4.3,
    reviewCount: 64,
    price: "$5.75",
  },

  // =========================
  // PEAR CIDER
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pear Cider",
    category: "Pear · 330mL",
    categoryGroup: "cider",
    name: "Classic Pear Cider",
    rating: 4.5,
    reviewCount: 81,
    price: "$6.25",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pear Cider",
    category: "Pear · 330mL",
    categoryGroup: "cider",
    name: "Crisp Pear Cider",
    rating: 4.6,
    reviewCount: 96,
    price: "$6.75",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pear Cider",
    category: "Pear · 375mL",
    categoryGroup: "cider",
    name: "Premium Pear Cider",
    rating: 4.7,
    reviewCount: 73,
    price: "$7.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Pear Cider",
    category: "Pear · 330mL",
    categoryGroup: "cider",
    name: "Fresh Pear Cider",
    rating: 4.4,
    reviewCount: 59,
    price: "$6.49",
  },

  // =========================
  // FRUIT CIDER
  // =========================

  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Fruit Cider",
    category: "Fruit Cider · 330mL",
    categoryGroup: "cider",
    name: "Classic Fruit Cider",
    rating: 4.5,
    reviewCount: 85,
    price: "$6.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Fruit Cider",
    category: "Fruit Cider · 330mL",
    categoryGroup: "cider",
    name: "Berry Fruit Cider",
    rating: 4.7,
    reviewCount: 112,
    price: "$6.99",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Fruit Cider",
    category: "Fruit Cider · 375mL",
    categoryGroup: "cider",
    name: "Tropical Fruit Cider",
    rating: 4.6,
    reviewCount: 97,
    price: "$7.49",
  },
  {
    image: "",
    badgeStyle: "plain",
    badgeText: "Fruit Cider",
    category: "Fruit Cider · 330mL",
    categoryGroup: "cider",
    name: "Mixed Fruit Cider",
    rating: 4.4,
    reviewCount: 68,
    price: "$6.75",
  },

  // =====================================================
  // EXAMPLE PRODUCTS FOR OTHER SPIRIT TYPES
  // =====================================================
  //
  // Add your actual Gin/Rum/Tequila/Liqueur/etc.
  // products using the same structure.
  //
  // =====================================================

  {
    image: "https://media.sipnow.com.au/sipnow/products/gin-example.webp",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Gin",

    category: "Gin · 700mL",
    categoryGroup: "spirits",
    type: "Gin",

    name: "Example Gin",

    rating: 4.5,
    reviewCount: 100,
    price: "$25.00",
  },

  {
    image: "https://media.sipnow.com.au/sipnow/products/rum-example.webp",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Rum",

    category: "Rum · 700mL",
    categoryGroup: "spirits",
    type: "Rum",

    name: "Example Rum",

    rating: 4.4,
    reviewCount: 85,
    price: "$28.00",
  },

  {
    image: "https://media.sipnow.com.au/sipnow/products/tequila-example.webp",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Tequila",

    category: "Tequila · 700mL",
    categoryGroup: "spirits",
    type: "Tequilla",

    name: "Example Tequila",

    rating: 4.3,
    reviewCount: 72,
    price: "$32.00",
  },

  {
    image: "https://media.sipnow.com.au/sipnow/products/liqueur-example.webp",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Liqueurs",

    category: "Liqueur · 700mL",
    categoryGroup: "spirits",
    type: "Liquerus",

    name: "Example Liqueur",

    rating: 4.2,
    reviewCount: 61,
    price: "$24.00",
  },

  // =====================================================
  // OFFERS & SERVICES
  // =====================================================
  //
  // These use `section` instead of `type`.
  //
  // =====================================================

  {
    image: "https://media.sipnow.com.au/sipnow/products/promotion-example.webp",

    badgeStyle: "glow",
    icon: "local_offer",
    badgeText: "Special Offer",

    category: "Promotion",
    categoryGroup: "offers",
    section: "general-promotions",

    name: "General Promotion Product",

    rating: 4.5,
    reviewCount: 50,
    price: "$15.00",
  },

  {
    image: "https://media.sipnow.com.au/sipnow/products/gift-card-example.webp",

    badgeStyle: "glow",
    icon: "card_giftcard",
    badgeText: "Gift Card",

    category: "Gift Card",
    categoryGroup: "offers",
    section: "gift-cards",

    name: "SipNow Gift Card",

    rating: 5.0,
    reviewCount: 120,
    price: "$50.00",
  },

  {
    image: "https://media.sipnow.com.au/sipnow/products/member-example.webp",

    badgeStyle: "glow",
    icon: "workspace_premium",
    badgeText: "Members",

    category: "Member Offer",
    categoryGroup: "offers",
    section: "members",

    name: "SipNow Member Special",

    rating: 4.8,
    reviewCount: 80,
    price: "$20.00",
  },

  {
    image: "https://media.sipnow.com.au/sipnow/products/clearance-example.webp",

    badgeStyle: "plain",
    icon: "sell",
    badgeText: "Clearance",

    category: "Clearance",
    categoryGroup: "offers",
    section: "clearance",

    name: "Clearance Product",

    rating: 4.1,
    reviewCount: 45,
    price: "$9.99",
  },
];
