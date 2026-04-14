import type { MenuFilterOption, MenuItem } from "../_lib/types";

const proteinChoices = ["Chicken", "Pork", "Beef", "Shrimp", "Tofu"];
const namTokChoices = ["Pork", "Chicken", "Beef"];

const menuImageMap: Record<string, string> = {
  a1: "/images/senlek/real/menu/a1-thai-chicken-wings.jpg",
  a2: "/images/senlek/real/menu/a2-assorted-fried-meatballs.jpg",
  a3: "/images/senlek/real/menu/a3-steam-dumplings.jpg",
  a4: "/images/senlek/real/menu/a4-cucumber-salad.jpg",
  a5: "/images/senlek/real/menu/a5-papaya-salad.jpg",
  a6: "/images/senlek/real/menu/a6-corn-salad.jpg",
  a7: "/images/senlek/real/menu/a7-veggies-spring-roll.jpg",
  a8: "/images/senlek/real/menu/a8-seafood-papaya-salad.jpg",
  a9: "/images/senlek/real/menu/a9-fried-calamari.jpg",
  a10: "/images/senlek/real/menu/a10-tom-kha-small.jpg",
  r1: "/images/senlek/real/menu/r1-khao-see-krong-nue-yang.jpg",
  r2: "/images/senlek/real/menu/r2-khao-moo-grob.jpg",
  r3: "/images/senlek/real/menu/r3-khao-moo-yang.jpg",
  r4: "/images/senlek/real/menu/r4-khao-gai-tod.jpg",
  r5: "/images/senlek/real/menu/r5-khao-pla-tu-tod.jpg",
  r6: "/images/senlek/real/menu/r6-khao-gra-dook-moo.jpg",
  r7: "/images/senlek/real/menu/r7-khao-kha-moo.jpg",
  n1: "/images/senlek/real/menu/n1-boat-noodle-soup.jpg",
  n2: "/images/senlek/real/menu/n2-senlek-nue-toon.jpg",
  n3: "/images/senlek/real/menu/n3-tom-yum-noodle-soup.jpg",
  n4: "/images/senlek/real/menu/n4-yen-ta-fo.jpg",
  s1: "/images/senlek/real/menu/s1-stir-fry-garlic.jpg",
  s2: "/images/senlek/real/menu/s2-stir-fry-thai-basil.jpg",
  c1: "/images/senlek/real/menu/c1-green-curry.jpg",
  c2: "/images/senlek/real/menu/c2-red-curry.jpg",
  c3: "/images/senlek/real/menu/c3-massaman-curry.jpg",
  sp1: "/images/senlek/real/menu/sp1-pad-thai.jpg",
  sp2: "/images/senlek/real/menu/sp2-khao-soi.jpg",
  sp3: "/images/senlek/real/menu/sp3-thai-fried-rice.jpg",
  sp4: "/images/senlek/real/menu/sp4-nam-tok.jpg",
  sp5: "/images/senlek/real/menu/sp5-larb.jpg",
  sp6: "/images/senlek/real/menu/sp6-tom-kha-with-rice.jpg",
  sp7: "/images/senlek/real/menu/sp7-tom-yum-goong.jpg",
  d1: "/images/senlek/real/menu/d1-bua-loi.jpg",
  dr1: "/images/senlek/real/menu/dr1-thai-tea.jpg",
  dr2: "/images/senlek/real/menu/dr2-thai-coffee.jpg",
  dr3: "/images/senlek/real/menu/dr3-thai-lemon-tea.jpg",
  dr4: "/images/senlek/real/menu/dr4-coconut-water.jpg",
  dr5: "/images/senlek/real/menu/dr5-soft-drinks.jpg",
  dr6: "/images/senlek/real/menu/dr6-water.jpg"
};

const rawMenuItems: MenuItem[] = [
  {
    id: "a1",
    code: "A1",
    name: "Thai Chicken Wings",
    thaiName: "\u0e1b\u0e35\u0e01\u0e44\u0e01\u0e48\u0e17\u0e2d\u0e14",
    description: "Thai-style chicken wings with house sweet chili sauce",
    price: 8,
    category: "appetizers",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["chicken"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a2",
    code: "A2",
    name: "Assorted Fried Meatballs",
    thaiName: "\u0e25\u0e39\u0e01\u0e0a\u0e34\u0e49\u0e19\u0e17\u0e2d\u0e14\u0e23\u0e27\u0e21",
    description:
      "Fried fish ball, pork ball, fish cake, fish tofu with house sweet chili sauce",
    price: 8,
    category: "appetizers",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["pork", "seafood", "tofu"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a3",
    code: "A3",
    name: "Steam Dumplings (Kanomjeep)",
    thaiName: "\u0e02\u0e19\u0e21\u0e08\u0e35\u0e1a",
    description: "Steamed shrimp dumpling with Thai-style sauce",
    price: 8,
    category: "appetizers",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["seafood"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a4",
    code: "A4",
    name: "Cucumber Salad (Tum Tang)",
    thaiName: "\u0e15\u0e33\u0e41\u0e15\u0e07",
    description: "Thai spicy cucumber salad",
    price: 9,
    category: "appetizers",
    isPopular: false,
    isSpicy: true,
    spiceLevel: 2,
    dietaryTags: ["spicy", "vegetarian"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a5",
    code: "A5",
    name: "Papaya Salad (Somtum)",
    thaiName: "\u0e2a\u0e49\u0e21\u0e15\u0e33",
    description: "Thai spicy papaya salad",
    price: 9,
    category: "appetizers",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 3,
    dietaryTags: ["spicy", "vegetarian"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a6",
    code: "A6",
    name: "Corn Salad",
    thaiName: "\u0e22\u0e33\u0e02\u0e49\u0e32\u0e27\u0e42\u0e1e\u0e14",
    description: "Thai spicy corn salad",
    price: 9,
    category: "appetizers",
    isPopular: false,
    isSpicy: true,
    spiceLevel: 2,
    dietaryTags: ["spicy", "vegetarian"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a7",
    code: "A7",
    name: "Veggies Spring Roll",
    thaiName: "\u0e1b\u0e2d\u0e40\u0e1b\u0e35\u0e4a\u0e22\u0e30\u0e17\u0e2d\u0e14",
    description: "Crispy rolls stuffed with vegetables, served with house sweet chili sauce",
    price: 8,
    category: "appetizers",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a8",
    code: "A8",
    name: "Seafood Papaya Salad",
    thaiName: "\u0e2a\u0e49\u0e21\u0e15\u0e33\u0e17\u0e30\u0e40\u0e25",
    description: "Spicy papaya salad with shrimp, fish tofu, fish cake, fish balls",
    price: 12,
    category: "appetizers",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 3,
    dietaryTags: ["seafood", "spicy", "tofu"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a9",
    code: "A9",
    name: "Fried Calamari",
    thaiName: "\u0e1b\u0e25\u0e32\u0e2b\u0e21\u0e36\u0e01\u0e17\u0e2d\u0e14",
    description:
      "Lightly breaded calamari, fried until golden and crisp, served with house sweet chili sauce",
    price: 10,
    category: "appetizers",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["seafood"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "a10",
    code: "A10",
    name: "Tom Kha (Small, No Meat)",
    thaiName: "\u0e15\u0e49\u0e21\u0e02\u0e48\u0e32",
    description:
      "A small Thai coconut soup with mushrooms, lemongrass, galangal, and lime leaves. Light, tangy, and aromatic — meat-free and full of flavor",
    price: 8,
    category: "appetizers",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/appetizers-placeholder.svg"
  },
  {
    id: "r1",
    code: "R1",
    name: "Khao See Krong Nue Yang",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e0b\u0e35\u0e48\u0e42\u0e04\u0e23\u0e07\u0e40\u0e19\u0e37\u0e49\u0e2d\u0e22\u0e48\u0e32\u0e07",
    description: "Rice with Thai-style grilled beef short ribs, served with steamed vegetables",
    price: 15,
    category: "rice-dishes",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["beef"],
    image: "/images/senlek/signature-beef-short-ribs.svg"
  },
  {
    id: "r2",
    code: "R2",
    name: "Khao Moo Grob",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e2b\u0e21\u0e39\u0e01\u0e23\u0e2d\u0e1a",
    description: "Rice with crispy pork belly, served with steamed vegetables",
    price: 15,
    category: "rice-dishes",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["pork"],
    image: "/images/senlek/signature-crispy-pork-belly.svg"
  },
  {
    id: "r3",
    code: "R3",
    name: "Khao Moo Yang",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e2b\u0e21\u0e39\u0e22\u0e48\u0e32\u0e07",
    description: "Rice with Thai-style grilled pork, served with steamed vegetables",
    price: 14,
    category: "rice-dishes",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["pork"],
    image: "/images/senlek/rice-dishes-placeholder.svg"
  },
  {
    id: "r4",
    code: "R4",
    name: "Khao Gai Tod",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e44\u0e01\u0e48\u0e17\u0e2d\u0e14",
    description: "Rice with Thai-style fried chicken, served with steamed vegetables",
    price: 14,
    category: "rice-dishes",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["chicken"],
    image: "/images/senlek/rice-dishes-placeholder.svg"
  },
  {
    id: "r5",
    code: "R5",
    name: "Khao Pla Tu Tod",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e1b\u0e25\u0e32\u0e17\u0e39\u0e17\u0e2d\u0e14",
    description:
      "Crispy, tender grilled mackerel served with steamed rice and steamed vegetables",
    price: 14,
    category: "rice-dishes",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["seafood"],
    image: "/images/senlek/rice-dishes-placeholder.svg"
  },
  {
    id: "r6",
    code: "R6",
    name: "Khao Gra Dook Moo",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e01\u0e23\u0e30\u0e14\u0e39\u0e01\u0e2b\u0e21\u0e39",
    description: "Juicy, golden pork ribs served over fluffy rice, bursting with savory flavor",
    price: 14,
    category: "rice-dishes",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["pork"],
    image: "/images/senlek/rice-dishes-placeholder.svg"
  },
  {
    id: "r7",
    code: "R7",
    name: "Khao Kha Moo",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e02\u0e32\u0e2b\u0e21\u0e39",
    description: "Rice with braised pork leg — a beloved Thai comfort classic",
    price: 15,
    category: "rice-dishes",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["pork"],
    image: "/images/senlek/rice-dishes-placeholder.svg"
  },
  {
    id: "n1",
    code: "N1",
    name: "Boat Noodle Soup (Guay Tiew Rua)",
    thaiName: "\u0e01\u0e4b\u0e27\u0e22\u0e40\u0e15\u0e35\u0e4b\u0e22\u0e27\u0e40\u0e23\u0e37\u0e2d",
    description: "Rice noodle thickened boat soup with pork and fishball (pork broth)",
    price: 14,
    category: "noodle-soups",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["pork", "seafood"],
    image: "/images/senlek/noodle-soups-placeholder.svg"
  },
  {
    id: "n2",
    code: "N2",
    name: "Senlek Nue Toon",
    thaiName: "\u0e40\u0e2a\u0e49\u0e19\u0e40\u0e25\u0e47\u0e01\u0e40\u0e19\u0e37\u0e49\u0e2d\u0e15\u0e38\u0e4b\u0e19",
    description: "Braised beef noodle soup — the house signature dish",
    price: 15,
    category: "noodle-soups",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["beef"],
    image: "/images/senlek/signature-senlek-nue-toon.svg"
  },
  {
    id: "n3",
    code: "N3",
    name: "Tom Yum Noodle Soup",
    thaiName: "\u0e01\u0e4b\u0e27\u0e22\u0e40\u0e15\u0e35\u0e4b\u0e22\u0e27\u0e15\u0e49\u0e21\u0e22\u0e33",
    description: "Rice noodle with Thai spicy, sour soup with pork and fish balls (pork broth)",
    price: 14,
    category: "noodle-soups",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 3,
    dietaryTags: ["pork", "seafood", "spicy"],
    image: "/images/senlek/noodle-soups-placeholder.svg"
  },
  {
    id: "n4",
    code: "N4",
    name: "Yen Ta Fo",
    thaiName: "\u0e40\u0e22\u0e47\u0e19\u0e15\u0e32\u0e42\u0e1f",
    description:
      "Rice noodle in red bean curd sauce soup with shrimp, fish tofu, fish cake and fish balls (pork broth)",
    price: 14,
    category: "noodle-soups",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["pork", "seafood", "tofu"],
    image: "/images/senlek/noodle-soups-placeholder.svg"
  },
  {
    id: "s1",
    code: "S1",
    name: "Stir-Fry Garlic (Pad Kratiam)",
    thaiName: "\u0e1c\u0e31\u0e14\u0e01\u0e23\u0e30\u0e40\u0e17\u0e35\u0e22\u0e21",
    description:
      "Stir-fried choice of meat with garlic and black pepper, served over rice. A savory, aromatic Thai favorite",
    price: 14,
    category: "stir-fry",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["mild"],
    proteinOptions: proteinChoices,
    image: "/images/senlek/stir-fry-placeholder.svg"
  },
  {
    id: "s2",
    code: "S2",
    name: "Stir-Fry Thai Basil (Pad Kra Pao)",
    thaiName: "\u0e1c\u0e31\u0e14\u0e01\u0e30\u0e40\u0e1e\u0e23\u0e32",
    description:
      "Stir-fried choice of meat with Thai basil, garlic, chili, and mixed vegetables. Fragrant, flavorful, and served over rice",
    price: 14,
    category: "stir-fry",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 2,
    dietaryTags: ["spicy"],
    proteinOptions: proteinChoices,
    image: "/images/senlek/stir-fry-placeholder.svg"
  },
  {
    id: "c1",
    code: "C1",
    name: "Green Curry (Gaeng Keow Wan)",
    thaiName: "\u0e41\u0e01\u0e07\u0e40\u0e02\u0e35\u0e22\u0e27\u0e2b\u0e27\u0e32\u0e19",
    description:
      "Classic Thai green curry with coconut milk, mixed vegetables, basil and choice of meat",
    price: 15,
    category: "curries",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 2,
    dietaryTags: ["spicy"],
    proteinOptions: proteinChoices,
    image: "/images/senlek/signature-green-curry.svg"
  },
  {
    id: "c2",
    code: "C2",
    name: "Red Curry (Gaeng Daeng)",
    thaiName: "\u0e41\u0e01\u0e07\u0e41\u0e14\u0e07",
    description:
      "Spicy red curry with coconut milk, mixed vegetables, basil and choice of meat",
    price: 15,
    category: "curries",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 3,
    dietaryTags: ["spicy"],
    proteinOptions: proteinChoices,
    image: "/images/senlek/curries-placeholder.svg"
  },
  {
    id: "c3",
    code: "C3",
    name: "Massaman Curry (Gaeng Massaman)",
    thaiName: "\u0e41\u0e01\u0e07\u0e21\u0e31\u0e2a\u0e2a\u0e21\u0e31\u0e48\u0e19",
    description:
      "Creamy, mildly spicy with nutty flavor Thai curry with coconut milk, mixed vegetables, basil and choice of meat",
    price: 15,
    category: "curries",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["mild", "nuts"],
    proteinOptions: proteinChoices,
    image: "/images/senlek/curries-placeholder.svg"
  },
  {
    id: "sp1",
    code: "SP1",
    name: "Pad Thai",
    thaiName: "\u0e1c\u0e31\u0e14\u0e44\u0e17\u0e22",
    description:
      "Stir-fried rice noodles with choice of meat, tossed in a tangy tamarind sauce, topped with crushed peanuts and fresh lime",
    price: 15,
    category: "specialties",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["egg", "nuts"],
    image: "/images/senlek/signature-pad-thai.svg"
  },
  {
    id: "sp2",
    code: "SP2",
    name: "Khao Soi",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e0b\u0e2d\u0e22",
    description:
      "A Northern Thai favorite with rich curry broth, egg noodles, tender chicken, and crispy noodles on top",
    price: 15,
    category: "specialties",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 2,
    dietaryTags: ["chicken", "egg", "spicy"],
    image: "/images/senlek/signature-khao-soi.svg"
  },
  {
    id: "sp3",
    code: "SP3",
    name: "Thai Fried Rice (Khao Pad)",
    thaiName: "\u0e02\u0e49\u0e32\u0e27\u0e1c\u0e31\u0e14",
    description:
      "Rice stir-fried with garlic, egg, and seasonings, creating a savory, aromatic dish",
    price: 14,
    category: "specialties",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["egg"],
    image: "/images/senlek/specialties-placeholder.svg"
  },
  {
    id: "sp4",
    code: "SP4",
    name: "Nam Tok",
    thaiName: "\u0e19\u0e49\u0e33\u0e15\u0e01",
    description:
      "A classic Thai salad with grilled pork, chicken, or beef slices tossed in roasted rice powder, fresh herbs, lime juice, and chili for a smoky, zesty flavor",
    price: 14,
    category: "specialties",
    isPopular: false,
    isSpicy: true,
    spiceLevel: 2,
    dietaryTags: ["spicy"],
    proteinOptions: namTokChoices,
    image: "/images/senlek/specialties-placeholder.svg"
  },
  {
    id: "sp5",
    code: "SP5",
    name: "Larb",
    thaiName: "\u0e25\u0e32\u0e1a",
    description:
      "Minced meat tossed with lime juice, fish sauce, chili flakes, toasted rice powder, and fresh herbs. Bright, zesty, and mildly spicy. Served with white rice",
    price: 14,
    category: "specialties",
    isPopular: false,
    isSpicy: true,
    spiceLevel: 2,
    dietaryTags: ["spicy"],
    image: "/images/senlek/specialties-placeholder.svg"
  },
  {
    id: "sp6",
    code: "SP6",
    name: "Tom Kha with Rice",
    thaiName: "\u0e15\u0e49\u0e21\u0e02\u0e48\u0e32\u0e01\u0e31\u0e1a\u0e02\u0e49\u0e32\u0e27",
    description:
      "Rice with creamy coconut soup with galangal, lemongrass, lime, and herbs",
    price: 15,
    category: "specialties",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 1,
    dietaryTags: ["mild"],
    image: "/images/senlek/specialties-placeholder.svg"
  },
  {
    id: "sp7",
    code: "SP7",
    name: "Tom Yum Goong",
    thaiName: "\u0e15\u0e49\u0e21\u0e22\u0e33\u0e01\u0e38\u0e49\u0e07",
    description:
      "A bold and aromatic Thai hot-and-sour soup with juicy jumbo tiger prawns, infused with lemongrass, galangal, kaffir lime leaves, mushrooms, and fresh chili. Served with white rice",
    price: 18,
    category: "specialties",
    isPopular: true,
    isSpicy: true,
    spiceLevel: 3,
    dietaryTags: ["seafood", "spicy"],
    image: "/images/senlek/specialties-placeholder.svg"
  },
  {
    id: "d1",
    code: "D1",
    name: "Bua Loi",
    thaiName: "\u0e1a\u0e31\u0e27\u0e25\u0e2d\u0e22",
    description:
      "Warm, comforting Thai sweet made of soft, chewy rice-flour balls served in sweet coconut milk",
    price: 6,
    category: "dessert",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/dessert-placeholder.svg"
  },
  {
    id: "dr1",
    code: "DR1",
    name: "Thai Tea",
    thaiName: "\u0e0a\u0e32\u0e44\u0e17\u0e22",
    description: "Classic sweet Thai tea served over ice",
    price: 5,
    category: "drinks",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/drinks-placeholder.svg"
  },
  {
    id: "dr2",
    code: "DR2",
    name: "Thai Coffee",
    thaiName: "\u0e01\u0e32\u0e41\u0e1f\u0e44\u0e17\u0e22",
    description: "Rich Thai-style coffee served chilled",
    price: 5,
    category: "drinks",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/drinks-placeholder.svg"
  },
  {
    id: "dr3",
    code: "DR3",
    name: "Thai Lemon Tea",
    thaiName: "\u0e0a\u0e32\u0e21\u0e30\u0e19\u0e32\u0e27",
    description: "Refreshing Thai tea brightened with citrus",
    price: 5,
    category: "drinks",
    isPopular: true,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/drinks-placeholder.svg"
  },
  {
    id: "dr4",
    code: "DR4",
    name: "Coconut Water",
    thaiName: "\u0e19\u0e49\u0e33\u0e21\u0e30\u0e1e\u0e23\u0e49\u0e32\u0e27",
    description: "Naturally refreshing coconut water",
    price: 4,
    category: "drinks",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/drinks-placeholder.svg"
  },
  {
    id: "dr5",
    code: "DR5",
    name: "Soft Drinks",
    thaiName: "\u0e19\u0e49\u0e33\u0e2d\u0e31\u0e14\u0e25\u0e21",
    description: "Assorted soft drinks",
    price: 3,
    category: "drinks",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/drinks-placeholder.svg"
  },
  {
    id: "dr6",
    code: "DR6",
    name: "Water",
    thaiName: "\u0e19\u0e49\u0e33\u0e40\u0e1b\u0e25\u0e48\u0e32",
    description: "Still water",
    price: 2,
    category: "drinks",
    isPopular: false,
    isSpicy: false,
    spiceLevel: 0,
    dietaryTags: ["vegetarian"],
    image: "/images/senlek/drinks-placeholder.svg"
  }
];

export const menuItems: MenuItem[] = rawMenuItems.map((item) => ({
  ...item,
  image: menuImageMap[item.id] ?? item.image
}));

export const menuFilters: MenuFilterOption[] = [
  {
    id: "all",
    label: "All",
    categories: [
      "appetizers",
      "rice-dishes",
      "noodle-soups",
      "stir-fry",
      "curries",
      "specialties",
      "dessert",
      "drinks"
    ]
  },
  {
    id: "appetizers",
    label: "Appetizers",
    categories: ["appetizers"]
  },
  {
    id: "rice-dishes",
    label: "Rice Dishes",
    categories: ["rice-dishes"]
  },
  {
    id: "noodle-soups",
    label: "Noodle Soups",
    categories: ["noodle-soups"]
  },
  {
    id: "stir-fry",
    label: "Stir-Fry",
    categories: ["stir-fry"]
  },
  {
    id: "curries",
    label: "Curries",
    categories: ["curries"]
  },
  {
    id: "specialties",
    label: "Specialties",
    categories: ["specialties"]
  },
  {
    id: "dessert-drinks",
    label: "Dessert & Drinks",
    categories: ["dessert", "drinks"]
  }
];

export const categoryLabels = {
  appetizers: "Appetizers",
  "rice-dishes": "Rice Dishes",
  "noodle-soups": "Noodle Soups",
  "stir-fry": "Stir-Fry Over Rice",
  curries: "Curries",
  specialties: "Specialties",
  dessert: "Dessert",
  drinks: "Drinks"
} as const;
