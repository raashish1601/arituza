import type { ContactLink, RestaurantStat, StorySection } from "../_lib/types";

export const restaurantInfo = {
  fullLegalName: "SENLEK THAI RICE & NOODLES",
  displayName: "Senlek Thai Rice & Noodles",
  tagline: "Authentic Thai Street Food — Bold Flavors, Made with Care",
  cuisineType: "Authentic Thai Street Food — Rice Bowls & Noodle Soups",
  owner: "Nop Sac-Uang",
  yearOpened: 2025,
  wordMeaning: '"Senlek" (\u0e40\u0e2a\u0e49\u0e19\u0e40\u0e25\u0e47\u0e01) means "thin rice noodles" in Thai',
  addressLine1: "1843 Montgomery Hwy, Suite 107",
  addressLine2: "Hoover, AL 35244",
  shoppingCenter: "The Plaza at Riverchase",
  fullAddress: "1843 Montgomery Hwy, Suite 107, Hoover, AL 35244",
  phoneDisplay: "(205) 937-8099",
  phoneHref: "tel:+12059378099",
  phoneIntl: "+12059378099",
  coordinates: {
    latitude: 33.3706557,
    longitude: -86.7971354
  },
  mapsLink:
    "https://www.google.com/maps/place/SENLEK+THAI+RICE%26NOODLES/@33.3706557,-86.7971354,17z",
  mapsEmbed: "https://www.google.com/maps?q=33.3706557,-86.7971354&z=17&output=embed",
  instagram: "https://www.instagram.com/senlekthairicenoodles/",
  facebook: "https://www.facebook.com/p/Senlek-THAI-RiceNoodles-61577239157957/",
  toast: "https://www.toasttab.com/local/order/senlek-thai-rice-noodles-1843-montgomery-hwy-107",
  doorDash: "https://www.doordash.com/en/store/senlek-thai-rice&noodles-hoover-35591631/",
  uberEats: "https://www.ubereats.com/store/senlek-thai-rice&noodles/s8rRPV0tSSSIh8ROM8FuLA",
  yelp: "https://www.yelp.com/biz/senlek-thai-rice-and-noodles-hoover",
  giftCardLink: "https://www.giftly.com/gift-card/senlek-thai-rice-noodles-hoover",
  businessTimeZone: "America/Chicago",
  basePath: "/portfolio/senlek-thai",
  storageKeys: {
    favorites: "senlek-flavor-passport-favorites",
    preferences: "senlek-flavor-passport-preferences"
  },
  heroBadge: "Authentic Thai Street Food in Hoover, AL",
  heroHeading: "Bold Flavors,\nMade with Care",
  heroSubheading:
    "From comforting noodle soups to sizzling rice bowls — experience the true taste of Thailand at The Plaza at Riverchase.",
  aboutPreviewTitle: "A Taste of Thailand in the Heart of Hoover",
  aboutPreviewCopy: [
    "Senlek Thai Rice & Noodles brings the heart of Thailand straight to your table with bold flavors, authentic recipes, and comforting dishes made with care. The menu celebrates Thai-style rice and noodle bowls, from braised beef noodle soup to grilled short ribs and beloved street-food salads.",
    "What makes Senlek special is the craft behind the flavor. Owner Nop Sac-Uang makes the sauces, broths, and salad dressings in-house himself, drawing on years of restaurant experience to create food that feels both vibrant and deeply comforting.",
    'The name "Senlek" means thin rice noodles in Thai, a fitting symbol for a restaurant built around the soul of Thai street food and served in a bright, welcoming dining room full of blue tones, colorful plates, and wicker warmth.'
  ],
  storyIntro:
    "Senlek Thai Rice & Noodles brings the heart of Thailand straight to your table with bold flavors, authentic recipes, and comforting dishes made with care. The restaurant specializes in Thai-style rice and noodle bowls, featuring customer favorites like Senlek Nue Toon, Khao Kha Moo, and Khao See Krong Nue Yang. All sauces, broths, and salad dressings are made in-house by the owner himself.",
  contactLinks: [
    { label: "Instagram", href: "https://www.instagram.com/senlekthairicenoodles/" },
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Senlek-THAI-RiceNoodles-61577239157957/"
    }
  ] satisfies ContactLink[],
  orderingLinks: [
    {
      label: "Toast Online Ordering",
      href: "https://www.toasttab.com/local/order/senlek-thai-rice-noodles-1843-montgomery-hwy-107"
    },
    {
      label: "DoorDash Delivery",
      href: "https://www.doordash.com/en/store/senlek-thai-rice&noodles-hoover-35591631/"
    },
    {
      label: "Uber Eats Delivery",
      href: "https://www.ubereats.com/store/senlek-thai-rice&noodles/s8rRPV0tSSSIh8ROM8FuLA"
    }
  ] satisfies ContactLink[],
  faqItems: [
    {
      question: "Do you offer delivery?",
      answer:
        "Yes! Order through DoorDash, Uber Eats, or directly through our Toast ordering page."
    },
    {
      question: "Is parking available?",
      answer: "Yes, free parking is available at The Plaza at Riverchase shopping center."
    },
    {
      question: "Do you take reservations?",
      answer:
        "We operate on a first-come, first-served basis. For large parties, please call ahead."
    },
    {
      question: "Can I customize the spice level?",
      answer: "Absolutely! Just let your server know your preferred spice level."
    }
  ],
  stats: [
    { value: 30, prefix: "", suffix: "+", label: "Dishes Served with Care" },
    { value: 100, prefix: "", suffix: "%", label: "House-Made Sauces & Broths" },
    { value: 2025, prefix: "", suffix: "", label: "Opened in Hoover" }
  ] satisfies RestaurantStat[],
  storySections: [
    {
      id: "meaning",
      overline: "The Meaning of Senlek",
      title: "Thin rice noodles, deep tradition.",
      copy: [
        'The word "Senlek" (\u0e40\u0e2a\u0e49\u0e19\u0e40\u0e25\u0e47\u0e01) means thin rice noodles in Thai. It is a simple phrase, but it carries the feeling of everyday comfort food found across Thailand — bowls layered with aroma, warmth, and balance.',
        "That spirit shapes the restaurant from the first sip of broth to the final spoonful of curry. The menu is rooted in the kinds of rice bowls and noodle soups that define Thai street food culture: bold, satisfying, and made to be enjoyed often."
      ],
      image: "/images/senlek/real/about/meaning.jpg",
      imageAlt: "A real Senlek noodle soup served at Senlek Thai Rice & Noodles.",
      imageHint: "/images/senlek/about-meaning.jpg"
    },
    {
      id: "owner",
      overline: "Meet the Owner",
      title: "Nop Sac-Uang built Senlek from years of kitchen experience.",
      copy: [
        "Owner Nop Sac-Uang spent years working in Birmingham-area restaurants, including Saigon Noodle House and Ginza Sushi & Korean BBQ, before opening a place of his own. Senlek is the result of that long-built dream and a clear vision for authentic Thai street food in Hoover.",
        "His hands are in the details guests taste most. Nop prepares the sauces, broths, and salad dressings in-house, bringing consistency, freshness, and the kind of deeply personal craftsmanship that makes a neighborhood restaurant memorable."
      ],
      image: "/images/senlek/real/about/owner.jpg",
      imageAlt: "Nop Sac-Uang inside the dining room at Senlek Thai Rice & Noodles.",
      imageHint: "/images/senlek/about-owner-portrait.jpg"
    },
    {
      id: "philosophy",
      overline: "Our Philosophy",
      title: "Fresh ingredients, authentic balance, warm hospitality.",
      copy: [
        "Senlek's philosophy is simple: use fresh, high-quality ingredients and honor the sweet, salty, sour, and spicy balance that makes Thai cooking so compelling. Every dish is designed to feel vibrant and full of intention, whether it is a street-food salad, a curry, or a comforting noodle bowl.",
        "That attention to flavor comes with a welcoming approach to service. The goal is not only to serve authentic Thai food, but to create an experience that feels generous, relaxed, and full of care from the moment guests walk in."
      ],
      image: "/images/senlek/real/about/food-prep.jpg",
      imageAlt: "A freshly plated Thai basil stir-fry from Senlek Thai Rice & Noodles.",
      imageHint: "/images/senlek/about-food-prep.jpg"
    },
    {
      id: "space",
      overline: "The Space",
      title: "Bright blue walls, colorful plates, and cozy market energy.",
      copy: [
        "Located in The Plaza at Riverchase, the restaurant feels bright, quaint, and welcoming. Vivid blue walls anchor the space, while colorful plates and wicker details add warmth, texture, and a sense of charm that evokes the vibrancy of Thailand.",
        "The result is a dining room that feels polished but personal — part neighborhood gem, part street-food-market memory, and unmistakably Senlek."
      ],
      image: "/images/senlek/real/about/dining-room.jpg",
      imageAlt: "The dining room inside Senlek Thai Rice & Noodles with vivid blue walls.",
      imageHint: "/images/senlek/about-dining-room.jpg"
    }
  ] satisfies StorySection[]
};

export const featuredDishCodes = ["R1", "N2", "SP1", "SP2", "R2", "C1"] as const;
