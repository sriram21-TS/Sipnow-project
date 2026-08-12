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
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Scotch Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Scotch Whisky",

    name: "Ballantine's 7 Fuses Scottish",

    rating: 4.8,
    reviewCount: 210,
    price: "$49.90",
  },

  {
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Scotch Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Scotch Whisky",

    name: "Highland Moss Reserve",

    rating: 4.7,
    reviewCount: 182,
    price: "$46.00",
  },

  {
    image: "https://images.unsplash.com/photo-1477764250597-dffe9f601ae8?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Scotch Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Scotch Whisky",

    name: "Isle of Skye Single Malt",

    rating: 4.9,
    reviewCount: 236,
    price: "$58.50",
  },

  {
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Scotch Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Scotch Whisky",

    name: "Lochlan Heritage",

    rating: 4.6,
    reviewCount: 171,
    price: "$53.00",
  },

  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Other Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Other Whisky",

    name: "Velvet Oak Barrel",

    rating: 4.4,
    reviewCount: 126,
    price: "$37.50",
  },

  {
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Other Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Other Whisky",

    name: "Aged Reserve Blend",

    rating: 4.3,
    reviewCount: 120,
    price: "$35.00",
  },

  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Other Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Other Whisky",

    name: "Smoky Ember Reserve",

    rating: 4.6,
    reviewCount: 148,
    price: "$41.00",
  },

  {
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Other Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Other Whisky",

    name: "Barrel House No. 7",

    rating: 4.2,
    reviewCount: 111,
    price: "$33.90",
  },

  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Other Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Other Whisky",

    name: "Golden Ember Blend",

    rating: 4.5,
    reviewCount: 138,
    price: "$39.00",
  },

  {
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Other Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Other Whisky",

    name: "Heritage Cask Select",

    rating: 4.7,
    reviewCount: 160,
    price: "$43.50",
  },

  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Japanese Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Japanese Whisky",

    name: "Sakura Reserve",

    rating: 4.8,
    reviewCount: 210,
    price: "$52.00",
  },

  {
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Japanese Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Japanese Whisky",

    name: "Yamashita Gold",

    rating: 4.6,
    reviewCount: 171,
    price: "$46.90",
  },

  {
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Japanese Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Japanese Whisky",

    name: "Hikari Nocturne",

    rating: 4.7,
    reviewCount: 188,
    price: "$49.50",
  },

  {
    image: "https://images.unsplash.com/photo-1523606772300-6e8b9f0e8787?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Japanese Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Japanese Whisky",

    name: "Kyoto Pearl",

    rating: 4.5,
    reviewCount: 147,
    price: "$44.00",
  },

  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Irish Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Irish Whisky",

    name: "Emerald Isle Reserve",

    rating: 4.7,
    reviewCount: 180,
    price: "$48.00",
  },

  {
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Irish Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Irish Whisky",

    name: "Clontarf Gold",

    rating: 4.6,
    reviewCount: 165,
    price: "$45.50",
  },

  {
    image: "https://images.unsplash.com/photo-1477764250597-dffe9f601ae8?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Irish Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Irish Whisky",

    name: "Bluewater Heritage",

    rating: 4.5,
    reviewCount: 152,
    price: "$42.90",
  },

  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "American Whisky · 700mL",
    categoryGroup: "spirits",
    type: "American Whisky",

    name: "Stone Creek Reserve",

    rating: 4.8,
    reviewCount: 215,
    price: "$58.00",
  },

  {
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "American Whisky · 700mL",
    categoryGroup: "spirits",
    type: "American Whisky",

    name: "Red Oak Bourbon",

    rating: 4.6,
    reviewCount: 172,
    price: "$51.50",
  },

  {
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "American Whisky · 700mL",
    categoryGroup: "spirits",
    type: "American Whisky",

    name: "Prairie Ember",

    rating: 4.7,
    reviewCount: 184,
    price: "$54.90",
  },

  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Australian Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Australian Whisky",

    name: "Tasman Cove Reserve",

    rating: 4.7,
    reviewCount: 178,
    price: "$47.00",
  },

  {
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Australian Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Australian Whisky",

    name: "Outback Ember",

    rating: 4.5,
    reviewCount: 151,
    price: "$43.90",
  },

  {
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",

    badgeStyle: "plain",
    icon: "liquor",
    badgeText: "Best in Whisky",

    category: "Australian Whisky · 700mL",
    categoryGroup: "spirits",
    type: "Australian Whisky",

    name: "Sunset Ridge",

    rating: 4.6,
    reviewCount: 162,
    price: "$46.50",
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
