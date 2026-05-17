import type { FoodItem } from "@/types";

const img = (path: string) => `/assets/${path}`;

export const foodProducts: FoodItem[] = [
  {
    id: 1,
    name: "Chiken And Salad",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 3.6,
    image: img("Food/dish3.png"),
    category: "Main Dishes",
    thums: [img("Food/dish3.png"), img("thums/ft1_1.png"), img("thums/ft1_2.png")],
    feature: true,
  },
  {
    id: 2,
    name: "Pizza",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 3.5,
    image: img("Food/f10.png"),
    category: "Main Dishes",
    thums: [img("Food/f10.png"), img("thums/ft1_3.png"), img("thums/ft2_1.png")],
    feature: false,
  },
  {
    id: 3,
    name: "Omlet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.5,
    image: img("Food/f9.png"),
    category: "Breakfast",
    thums: [img("Food/f9.png"), img("thums/ft2_2.png"), img("thums/ft2_3.png")],
    feature: false,
  },
  {
    id: 4,
    name: "Grill",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 4.2,
    image: img("Food/dish2.png"),
    category: "Main Dishes",
    thums: [img("Food/dish2.png"), img("thums/ft3_1.png"), img("thums/ft3_2.png")],
    feature: true,
  },
  {
    id: 5,
    name: "Ramin",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 2.3,
    image: img("Food/f13.png"),
    category: "Breakfast",
    thums: [img("Food/f13.png"), img("thums/ft3_3.png"), img("thums/ft4_1.png")],
    feature: false,
  },
  {
    id: 6,
    name: "Sallat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.4,
    image: img("Food/f7.png"),
    category: "Breakfast",
    thums: [img("Food/f7.png"), img("thums/ft4_2.png"), img("thums/ft4_3.png")],
    feature: false,
  },
  {
    id: 7,
    name: "Omlet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.5,
    image: img("Food/dish4.png"),
    category: "Breakfast",
    thums: [img("Food/dish4.png"), img("thums/ft5_1.png"), img("thums/ft5_2.png")],
    feature: true,
  },
  {
    id: 8,
    name: "Butter Chicken Taco",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.15,
    image: img("Food/f1.png"),
    category: "Breakfast",
    thums: [img("Food/f1.png"), img("thums/ft5_3.png"), img("thums/ft6_1.png")],
    feature: false,
  },
  {
    id: 9,
    name: "Chicken Burger",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.15,
    image: img("Food/f2.png"),
    category: "Main Dishes",
    thums: [img("Food/f2.png"), img("thums/ft6_2.png"), img("thums/ft6_3.png")],
    feature: false,
  },
  {
    id: 10,
    name: "Cake",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.15,
    image: img("Food/f3.png"),
    category: "Desserts",
    thums: [img("Food/f3.png"), img("thums/ft7_1.png"), img("thums/ft7_2.png")],
    feature: false,
  },
  {
    id: 11,
    name: "Fries",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.5,
    image: img("Food/f4.png"),
    category: "Main Dishes",
    thums: [img("Food/f4.png"), img("thums/ft7_3.png"), img("thums/ft8_1.png")],
    feature: false,
  },
  {
    id: 12,
    name: "sandwich",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.5,
    image: img("Food/f5.png"),
    category: "Main Dishes",
    thums: [img("Food/f5.png"), img("thums/ft8_2.png"), img("thums/ft8_3.png")],
    feature: false,
  },
  {
    id: 13,
    name: "Main Dishes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 5.2,
    image: img("Food/dish.png"),
    category: "Main Dishes",
    thums: [img("Food/dish.png"), img("thums/ft9_1.png"), img("thums/ft9_2.png")],
    feature: true,
  },
  {
    id: 14,
    name: "Pastry",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 5.2,
    image: img("Food/f11.png"),
    category: "Desserts",
    thums: [img("Food/f11.png"), img("thums/ft9_3.png"), img("thums/ft10_1.png")],
    feature: false,
  },
  {
    id: 15,
    name: "Pan Cake",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 4.3,
    image: img("Food/f12.png"),
    category: "Desserts",
    thums: [img("Food/f12.png"), img("thums/ft10_2.png"), img("thums/ft10_3.png")],
    feature: false,
  },
  {
    id: 16,
    name: "Burger",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.5,
    image: img("Food/f6.png"),
    category: "Breakfast",
    thums: [img("Food/f6.png"), img("thums/ft11_1.png"), img("thums/ft11_2.png")],
    feature: false,
  },
  {
    id: 17,
    name: "lemon juice",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 4.3,
    image: img("Food/f14.png"),
    category: "Drinks",
    thums: [img("Food/f14.png"), img("thums/ft11_3.png"), img("thums/ft12_1.png")],
    feature: false,
  },
  {
    id: 18,
    name: "Juice",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 2.4,
    image: img("Food/f15.png"),
    category: "Drinks",
    thums: [img("Food/f15.png"), img("thums/ft12_2.png"), img("thums/ft12_3.png")],
    feature: false,
  },
  {
    id: 19,
    name: "Burger",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.9,
    image: img("Food/f16.png"),
    category: "Main Dishes",
    thums: [img("Food/f16.png"), img("thums/ft13_1.png"), img("thums/ft13_2.png")],
    feature: false,
  },
  {
    id: 20,
    name: "French Fries",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 3.4,
    image: img("Food/f17.png"),
    category: "Main Dishes",
    thums: [img("Food/f17.png"), img("thums/ft13_3.png"), img("thums/ft14_1.png")],
    feature: false,
  },
  {
    id: 21,
    name: "French Fries",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 3.4,
    image: img("Food/f18.png"),
    category: "Main Dishes",
    thums: [img("Food/f18.png"), img("thums/ft14_2.png"), img("thums/ft14_3.png")],
    feature: false,
  },
  {
    id: 22,
    name: "Desserts",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 3.4,
    image: img("Food/f19.png"),
    category: "Desserts",
    thums: [],
    feature: false,
  },
  {
    id: 23,
    name: "Pen cake",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 3.4,
    image: img("Food/f20.png"),
    category: "Desserts",
    thums: [],
    feature: false,
  },
  {
    id: 24,
    name: "Roll",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut expedita possimus commodi, sit odio voluptatibus beatae.",
    price: 1.8,
    image: img("Food/f8.png"),
    category: "Breakfast",
    thums: [],
    feature: false,
  },
];
