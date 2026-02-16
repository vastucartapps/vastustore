import Medusa from "@medusajs/js-sdk"

const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_API_URL || "https://api-store.vastucart.in",
  debug: false,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  apiKey: process.env.MEDUSA_ADMIN_API_KEY,
})

const sampleProducts = [
  {
    title: "Vastu Pyramid - Copper",
    subtitle: "Energize your space with positive vibrations",
    description: "A handcrafted copper pyramid designed according to ancient Vastu principles. Perfect for meditation rooms, offices, and living spaces. Helps balance energies and promote harmony.",
    handle: "vastu-pyramid-copper",
    status: "published",
    tags: [{ value: "featured" }, { value: "bestseller" }],
    categories: [],
    variants: [
      {
        title: "Small (3 inch)",
        sku: "VP-CU-SM-001",
        manage_inventory: true,
        inventory_quantity: 25,
        prices: [
          { amount: 149900, currency_code: "inr" }, // ₹1,499
          { amount: 1999, currency_code: "usd" }, // $19.99
        ],
      },
      {
        title: "Medium (5 inch)",
        sku: "VP-CU-MD-001",
        manage_inventory: true,
        inventory_quantity: 15,
        prices: [
          { amount: 249900, currency_code: "inr" }, // ₹2,499
          { amount: 2999, currency_code: "usd" }, // $29.99
        ],
      },
      {
        title: "Large (7 inch)",
        sku: "VP-CU-LG-001",
        manage_inventory: true,
        inventory_quantity: 8,
        prices: [
          { amount: 399900, currency_code: "inr" }, // ₹3,999
          { amount: 4999, currency_code: "usd" }, // $49.99
        ],
      },
    ],
    metadata: {
      meta_title: "Copper Vastu Pyramid - Bring Positive Energy Home",
      meta_description: "Handcrafted copper pyramid for Vastu compliance. Available in 3 sizes.",
      brand: "VastuCart",
    },
  },
  {
    title: "Vastu Wind Chime - Brass",
    subtitle: "Melodious chimes for prosperity",
    description: "Traditional brass wind chime with 6 hollow rods that create soothing sounds. Ideal for main entrance, balcony, or garden. Attracts positive energy and good fortune according to Vastu Shastra.",
    handle: "vastu-wind-chime-brass",
    status: "published",
    tags: [{ value: "featured" }],
    categories: [],
    variants: [
      {
        title: "6 Rods",
        sku: "WC-BR-6R-001",
        manage_inventory: true,
        inventory_quantity: 30,
        prices: [
          { amount: 89900, currency_code: "inr" }, // ₹899
          { amount: 1299, currency_code: "usd" }, // $12.99
        ],
      },
    ],
    metadata: {
      meta_title: "Brass Wind Chime for Vastu - 6 Rods",
      meta_description: "Traditional brass wind chime for entrance. Brings positive energy.",
      brand: "VastuCart",
    },
  },
  {
    title: "Gomti Chakra Set - Natural",
    subtitle: "Sacred shells for Vastu correction",
    description: "Set of 11 natural Gomti Chakras (sacred shells) from the Gomti river. Used for Vastu correction, wealth attraction, and protection. Each chakra is carefully selected and energized.",
    handle: "gomti-chakra-set-natural",
    status: "published",
    tags: [{ value: "bestseller" }],
    categories: [],
    variants: [
      {
        title: "11 Pieces Set",
        sku: "GC-NT-11P-001",
        manage_inventory: true,
        inventory_quantity: 50,
        prices: [
          { amount: 29900, currency_code: "inr" }, // ₹299
          { amount: 499, currency_code: "usd" }, // $4.99
        ],
      },
    ],
    metadata: {
      meta_title: "Natural Gomti Chakra Set - 11 Pieces",
      meta_description: "Sacred Gomti Chakras for Vastu correction and prosperity.",
      brand: "VastuCart",
    },
  },
  {
    title: "Vastu Tortoise - Brass",
    subtitle: "Symbol of longevity and stability",
    description: "Beautifully crafted brass tortoise representing Lord Vishnu's Kurma avatar. Place in North direction for career growth or in living room for family harmony. Promotes stability and longevity.",
    handle: "vastu-tortoise-brass",
    status: "published",
    tags: [{ value: "featured" }],
    categories: [],
    variants: [
      {
        title: "Small (2 inch)",
        sku: "VT-BR-SM-001",
        manage_inventory: true,
        inventory_quantity: 20,
        prices: [
          { amount: 69900, currency_code: "inr" }, // ₹699
          { amount: 999, currency_code: "usd" }, // $9.99
        ],
      },
      {
        title: "Medium (4 inch)",
        sku: "VT-BR-MD-001",
        manage_inventory: true,
        inventory_quantity: 12,
        prices: [
          { amount: 129900, currency_code: "inr" }, // ₹1,299
          { amount: 1799, currency_code: "usd" }, // $17.99
        ],
      },
    ],
    metadata: {
      meta_title: "Brass Vastu Tortoise - Symbol of Stability",
      meta_description: "Brass tortoise for career growth and family harmony.",
      brand: "VastuCart",
    },
  },
  {
    title: "Crystal Salt Lamp - Himalayan Pink",
    subtitle: "Natural air purifier with warm glow",
    description: "Authentic Himalayan pink salt lamp carved from natural crystal. Acts as natural air purifier, releases negative ions, and creates a warm, soothing ambiance. Ideal for bedrooms and meditation spaces.",
    handle: "crystal-salt-lamp-himalayan",
    status: "published",
    tags: [{ value: "new" }],
    categories: [],
    variants: [
      {
        title: "2-3 kg",
        sku: "SL-HP-2K-001",
        manage_inventory: true,
        inventory_quantity: 5,
        prices: [
          { amount: 159900, currency_code: "inr" }, // ₹1,599
          { amount: 2199, currency_code: "usd" }, // $21.99
        ],
      },
    ],
    metadata: {
      meta_title: "Himalayan Pink Salt Lamp - Natural Air Purifier",
      meta_description: "Authentic Himalayan salt lamp for air purification and ambiance.",
      brand: "VastuCart",
    },
  },
  {
    title: "Laughing Buddha - Resin Gold",
    subtitle: "Attract wealth and happiness",
    description: "Golden laughing Buddha statue made from high-quality resin. Symbol of wealth, prosperity, and happiness. Place in living room or office for positive energy and abundance.",
    handle: "laughing-buddha-resin-gold",
    status: "draft",
    tags: [{ value: "new" }],
    categories: [],
    variants: [
      {
        title: "Medium (6 inch)",
        sku: "LB-RG-MD-001",
        manage_inventory: true,
        inventory_quantity: 3,
        prices: [
          { amount: 79900, currency_code: "inr" }, // ₹799
          { amount: 1099, currency_code: "usd" }, // $10.99
        ],
      },
    ],
    metadata: {
      meta_title: "Golden Laughing Buddha - Wealth & Happiness",
      meta_description: "Golden laughing Buddha for prosperity and positive energy.",
      brand: "VastuCart",
    },
  },
]

async function seedProducts() {
  console.log("🌱 Starting to seed sample products to Medusa...\n")

  try {
    for (const productData of sampleProducts) {
      try {
        console.log(`Creating: ${productData.title}...`)

        const { product } = await medusa.admin.product.create(productData as any)

        console.log(`✅ Created: ${product.title} (ID: ${product.id})`)
        console.log(`   - Variants: ${product.variants?.length || 0}`)
        console.log(`   - Status: ${product.status}`)
        console.log(`   - SKUs: ${product.variants?.map((v: any) => v.sku).join(", ")}`)
        console.log("")
      } catch (error: any) {
        console.error(`❌ Failed to create ${productData.title}:`, error.message)
        console.log("")
      }
    }

    console.log("✅ Sample product seeding complete!")
    console.log("\nYou can now view these products at:")
    console.log("👉 http://localhost:3000/admin/products")

  } catch (error) {
    console.error("❌ Error seeding products:", error)
    process.exit(1)
  }
}

seedProducts()
