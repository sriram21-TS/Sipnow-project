import { BEER_FEATURED_URL, WINE_FEATURED_URL } from "./images.js";

export const navMenus = [
  {
    label: "Beer & Cider",
    columns: [
      { heading: "Lager", items: ["Pilsner", "Dark Lager", "Helles"] },
      { heading: "Ale", items: ["Pale Ale", "IPA", "Stout & Porter"] },
      { heading: "Cider", items: ["Apple", "Pear", "Fruit Cider"] },
    ],
    featured: {
      type: "image",
      image: BEER_FEATURED_URL,
      tag: "Featured Craft",
      title: "Balter XPA Collection",
    },
  },
  {
    label: "Premix",
    columns: [
      { heading: "Vodka Mixers", items: ["Hard Seltzer", "Lemonade"] },
      { heading: "Dark Spirits", items: ["Whiskey & Cola", "Rum & Ginger"] },
      { heading: "Cocktails", items: ["Margarita", "Espresso Martini"] },
    ],
    featured: {
      type: "icon",
      icon: "auto_awesome",
      tag: "Summer Hits",
      title: "Ready-to-drink Classics",
    },
  },
  {
    label: "Wine",
    columns: [
      { heading: "Red", items: ["Shiraz", "Pinot Noir", "Merlot"] },
      { heading: "White", items: ["Chardonnay", "Sauvignon Blanc"] },
      { heading: "Sparkling", items: ["Champagne", "Prosecco"] },
    ],
    featured: {
      type: "image-only",
      image: WINE_FEATURED_URL,
    },
  },
];

export const mobileNavLinks = ["Beer & Cider", "Premix", "Wine", "My Account"];
