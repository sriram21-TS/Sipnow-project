export const quizQuestions = [
  {
    question: "What's the occasion?",
    options: [
      {
        label: "Casual Night In",
        icon: "home",
        scores: { beer: 2, zeroproof: 1 },
      },
      {
        label: "Celebration",
        icon: "celebration",
        scores: { wine: 2, spirits: 1 },
      },
      {
        label: "Dinner Party",
        icon: "restaurant",
        scores: { wine: 2, premix: 1 },
      },
      {
        label: "Just Because",
        icon: "sunny",
        scores: { premix: 2, beer: 1 },
      },
    ],
  },
  {
    question: "Pick your flavour profile.",
    options: [
      {
        label: "Crisp & Refreshing",
        icon: "water_drop",
        scores: { beer: 2, zeroproof: 1 },
      },
      {
        label: "Bold & Intense",
        icon: "local_fire_department",
        scores: { spirits: 2, wine: 1 },
      },
      {
        label: "Smooth & Mellow",
        icon: "nightlight",
        scores: { wine: 2, spirits: 1 },
      },
      {
        label: "Sweet & Fruity",
        icon: "eco",
        scores: { premix: 2, zeroproof: 1 },
      },
    ],
  },
  {
    question: "How adventurous are you feeling?",
    options: [
      {
        label: "Classic & Familiar",
        icon: "workspace_premium",
        scores: { beer: 1, wine: 1 },
      },
      {
        label: "Something New",
        icon: "explore",
        scores: { premix: 2, spirits: 1 },
      },
      {
        label: "Rare & Prestigious",
        icon: "diamond",
        scores: { spirits: 2, wine: 2 },
      },
      {
        label: "Surprise Me",
        icon: "shuffle",
        scores: { zeroproof: 1, beer: 1, wine: 1, spirits: 1, premix: 1 },
      },
    ],
  },
  {
    question: "Any preference on strength?",
    options: [
      {
        label: "Light",
        icon: "filter_1",
        scores: { beer: 1, zeroproof: 2 },
      },
      {
        label: "Medium",
        icon: "filter_2",
        scores: { wine: 2, premix: 1 },
      },
      { label: "Strong", icon: "filter_3", scores: { spirits: 2 } },
      { label: "No Preference", icon: "all_inclusive", scores: {} },
    ],
  },
];

export const quizResults = {
  beer: {
    title: "Beer & Cider",
    desc: "Independent brewers, bold flavours, small batches — you're a craft beer and cider person through and through.",
  },
  wine: {
    title: "Wine",
    desc: "From bold reds to crisp whites, a curated cellar selection of old-world classics awaits your palate.",
  },
  spirits: {
    title: "Spirits",
    desc: "Rare single malts and global spirits — you appreciate craftsmanship in every pour.",
  },
  premix: {
    title: "Premix",
    desc: "Ready-to-drink classics for every occasion — vibrant, easy, and always a good time.",
  },
  zeroproof: {
    title: "Zero Proof",
    desc: "Mindful excellence without compromise — refreshing options for every moment.",
  },
};
