// Gallery data — 100 plant images across 6 categories
// Replace imageUrl with your own photos when ready
// Recommended image size: 600x600px (square) or 600x800px (portrait)

const categories = ["Philodendron", "Monstera", "Anthurium", "Syngonium", "Epipremnum", "Alocasia"]

// Map plant display names to their static image paths.
// Add entries here after saving images to /static/gallery/.
// The admin tool at /admin generates this block for you.
export const imageMap = {
  // "Monstera Thai Constellation": "/gallery/monstera-thai-constellation.jpg",
}

export const plantNames = {
  Philodendron: [
    "Philodendron Pink Princess",
    "Philodendron Brasil",
    "Philodendron Birkin",
    "Philodendron Gloriosum",
    "Philodendron Melanochrysum",
    "Philodendron White Wizard",
    "Philodendron Micans",
    "Philodendron Squamiferum",
    "Philodendron Florida Ghost",
    "Philodendron Mamei",
    "Philodendron Joepii",
    "Philodendron Spiritus Sancti",
    "Philodendron Billietiae",
    "Philodendron Atabapoense",
    "Philodendron Verrucosum",
    "Philodendron Fibraecataphyllum",
    "Philodendron Patriciae",
  ],
  Monstera: [
    "Monstera Deliciosa",
    "Monstera Thai Constellation",
    "Monstera Albo Variegata",
    "Monstera Adansonii",
    "Monstera Standleyana",
    "Monstera Dubia",
    "Monstera Siltepecana",
    "Monstera Peru",
    "Monstera Acacoyaguensis",
    "Monstera Karstenianum",
    "Monstera Obliqua",
    "Monstera Pinnatipartita",
    "Monstera Xanthospatha",
    "Monstera Spruceana",
    "Monstera Epipremnoides",
    "Monstera Laniata",
    "Monstera Minima",
  ],
  Anthurium: [
    "Anthurium Clarinervium",
    "Anthurium Crystallinum",
    "Anthurium Warocqueanum",
    "Anthurium Regale",
    "Anthurium Veitchii",
    "Anthurium Magnificum",
    "Anthurium Forgetii",
    "Anthurium Superbum",
    "Anthurium Pedato-Radiatum",
    "Anthurium Brownii",
    "Anthurium Hookeri",
    "Anthurium Andreanum",
    "Anthurium Luxurians",
    "Anthurium Dressleri",
    "Anthurium Bullatus",
    "Anthurium Cutucuense",
    "Anthurium Dolichostachyum",
  ],
  Syngonium: [
    "Syngonium Podophyllum",
    "Syngonium Pink Allusion",
    "Syngonium Albo Variegatum",
    "Syngonium Neon",
    "Syngonium Erythrophyllum",
    "Syngonium Mojito",
    "Syngonium Confetti",
    "Syngonium Milk Confetti",
    "Syngonium Auritum",
    "Syngonium Rayii",
    "Syngonium Macrophyllum",
    "Syngonium Wendlandii",
    "Syngonium Hastifolium",
    "Syngonium Trileaf Wonder",
    "Syngonium White Butterfly",
    "Syngonium Batik",
  ],
  Epipremnum: [
    "Epipremnum Aureum Golden",
    "Epipremnum Aureum Marble Queen",
    "Epipremnum Aureum Neon",
    "Epipremnum Aureum N-Joy",
    "Epipremnum Aureum Pearls & Jade",
    "Epipremnum Pinnatum Albo",
    "Epipremnum Pinnatum Blue Form",
    "Epipremnum Pinnatum Cebu Blue",
    "Epipremnum Amplissimum",
    "Epipremnum Giganteum",
    "Epipremnum Treubii Moonlight",
    "Epipremnum Treubii Dark Form",
    "Epipremnum Aureum Glacier",
    "Epipremnum Aureum Shangri-La",
    "Epipremnum Aureum Global Green",
    "Epipremnum Amplissimum Silver",
  ],
  Alocasia: [
    "Alocasia Frydek",
    "Alocasia Black Velvet",
    "Alocasia Dragon Scale",
    "Alocasia Polly",
    "Alocasia Zebrina",
    "Alocasia Macrorrhiza",
    "Alocasia Baginda",
    "Alocasia Cuprea",
    "Alocasia Silver Dragon",
    "Alocasia Watsoniana",
    "Alocasia Jacklyn",
    "Alocasia Odora",
    "Alocasia Reginula",
    "Alocasia Longiloba",
    "Alocasia Portora",
    "Alocasia Stingray",
    "Alocasia Maharani",
  ],
}

// Colour palettes per category used as placeholder backgrounds
const categoryColours = {
  Philodendron: ["#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a"],
  Monstera: ["#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a"],
  Anthurium: ["#f8bbd0", "#f48fb1", "#f06292", "#ec407a"],
  Syngonium: ["#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726"],
  Epipremnum: ["#dcedc8", "#c5e1a5", "#aed581", "#9ccc65"],
  Alocasia: ["#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc"],
}

let id = 1
const gallery = []

for (const category of categories) {
  const names = plantNames[category]
  const colours = categoryColours[category]
  names.forEach((name, i) => {
    gallery.push({
      id: id++,
      name,
      category,
      imageUrl: imageMap[name] || null,
      placeholderColour: colours[i % colours.length],
      hasImage: !!imageMap[name],
    })
  })
}

// Trim to exactly 100
export default gallery.slice(0, 100)
export { categories }
