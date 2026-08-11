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
