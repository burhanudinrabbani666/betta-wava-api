import { Bettas } from "./schema";

export const BettasData: Bettas = [
  {
    id: "betta-001",
    name: "Betta Bluerim",
    slug: "betta-bluerim",
    price: 150000,
    stockLevel: 12,
    sku: "BW-BR-1",
    variant: "plakat",
    baseColor: "blue",
    grade: "competition",
    gender: "male",
    careGuide: {
      waterQuality: {
        temperatureCelcius: 27,
        phRange: { min: 6, max: 7 },
      },
      environment: {
        aquariumMinSize: { widthCm: 20, heightCm: 20 },
      },
      maintenance: {
        daily: "Flerring for 15 minutes",
        weekly: "Change 50% or Full of water",
      },
      diet: { feed: "1 - 2 daily", foodType: "Daphnia magna" },
      medicine: { nature: "cattapa leaves", chemical: "methylene blue" },
    },
    image:
      "https://bjjyofiaetiwriksopsx.supabase.co/storage/v1/object/public/bettas-images/bluerim-001.jpg",
    customerReview: [
      {
        customerName: "Agus",
        customerImage:
          "https://bjjyofiaetiwriksopsx.supabase.co/storage/v1/object/public/bettas-images/bluerim-customer-001.jpg",
        customerRating: 5,
        comment: "Very good fish",
      },
    ],
  },
  {
    id: "betta-002",
    name: "Betta Halfmoon White",
    slug: "betta-halfmoon-white",
    price: 200000,
    stockLevel: 5,
    sku: "BW-HM-1",
    variant: "halfmoon",
    baseColor: "white",
    grade: "a",
    gender: "female",
    careGuide: {
      waterQuality: {
        temperatureCelcius: 26,
        phRange: { min: 6.5, max: 7.5 },
      },
      environment: {
        aquariumMinSize: { widthCm: 25, heightCm: 25 },
      },
      maintenance: {
        daily: "Observe behavior, feed lightly",
        weekly: "25% water change",
      },
      diet: { feed: "2 daily", foodType: "Frozen brine shrimp" },
      medicine: { nature: "Indian almond leaves", chemical: "" },
    },
    image: "https://example.com/images/halfmoon-white.jpg",
    customerReview: [
      {
        customerName: "Siti",
        customerImage: "https://example.com/images/customers/siti.jpg",
        customerRating: 4,
        comment: "Healthy and beautiful",
      },
    ],
  },
  {
    id: "betta-003",
    name: "Betta Wild Green",
    slug: "betta-wild-green",
    price: 90000,
    stockLevel: 20,
    sku: "BW-WG-1",
    variant: "wild-betta",
    baseColor: "green",
    grade: "breeding",
    gender: "male",
    careGuide: {
      waterQuality: {
        temperatureCelcius: 25,
        phRange: { min: 6, max: 7 },
      },
      environment: {
        aquariumMinSize: { widthCm: 15, heightCm: 15 },
      },
      maintenance: {
        daily: "Light feeding, remove uneaten food",
        weekly: "30% water change",
      },
      diet: { feed: "1 - 2 daily", foodType: "Live daphnia" },
      medicine: { nature: "Indian almond leaves", chemical: "" },
    },
    image: "https://example.com/images/wild-green.jpg",
    customerReview: [],
  },
];

export default BettasData;
