export interface CarModel {
  id: string
  name: string
  series: string
  category: "hypercar" | "supercar" | "grand-tourer"
  price: number
  specs: {
    horsepower: number
    topSpeed: number
    acceleration: string
    engine: string
  }
  image: string
  description: string
}

export const carModels: CarModel[] = [
  {
    id: "apex-x1",
    name: "Apex X1",
    series: "X Series",
    category: "hypercar",
    price: 3500000,
    specs: {
      horsepower: 1200,
      topSpeed: 230,
      acceleration: "2.3s",
      engine: "V12 Hybrid",
    },
    image: "/black-hypercar-front-view.jpg",
    description: "The ultimate expression of performance and technology.",
  },
  {
    id: "velocity-gt",
    name: "Velocity GT",
    series: "GT Series",
    category: "grand-tourer",
    price: 2200000,
    specs: {
      horsepower: 850,
      topSpeed: 205,
      acceleration: "3.1s",
      engine: "V10 Twin-Turbo",
    },
    image: "/silver-grand-tourer-side-view.jpg",
    description: "Luxury and performance in perfect harmony.",
  },
  {
    id: "thunder-s9",
    name: "Thunder S9",
    series: "S Series",
    category: "supercar",
    price: 1800000,
    specs: {
      horsepower: 950,
      topSpeed: 217,
      acceleration: "2.8s",
      engine: "V12 Naturally Aspirated",
    },
    image: "/yellow-supercar-racing.jpg",
    description: "Raw power meets refined engineering.",
  },
  {
    id: "phantom-r7",
    name: "Phantom R7",
    series: "R Series",
    category: "supercar",
    price: 1500000,
    specs: {
      horsepower: 780,
      topSpeed: 198,
      acceleration: "3.4s",
      engine: "V8 Twin-Turbo",
    },
    image: "/red-supercar-track.jpg",
    description: "Precision engineering for the discerning driver.",
  },
  {
    id: "storm-h5",
    name: "Storm H5",
    series: "H Series",
    category: "hypercar",
    price: 4200000,
    specs: {
      horsepower: 1500,
      topSpeed: 250,
      acceleration: "2.0s",
      engine: "V16 Quad-Turbo",
    },
    image: "/carbon-fiber-hypercar-aerodynamic.jpg",
    description: "The pinnacle of automotive achievement.",
  },
  {
    id: "eclipse-gt2",
    name: "Eclipse GT2",
    series: "GT Series",
    category: "grand-tourer",
    price: 1900000,
    specs: {
      horsepower: 720,
      topSpeed: 195,
      acceleration: "3.6s",
      engine: "V8 Hybrid",
    },
    image: "/white-luxury-gt-car-sunset.jpg",
    description: "Elegance meets exhilaration.",
  },
]
