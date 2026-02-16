import Medusa from "@medusajs/js-sdk"

const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_API_URL || "https://api-store.vastucart.in",
  debug: true,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  apiKey: process.env.MEDUSA_ADMIN_API_KEY,
})

// Categories to create
const categories = [
  {
    name: "Vastu Pyramids",
    handle: "vastu-pyramids",
    description: "Sacred geometric pyramids for energy balancing and Vastu correction",
    is_active: true,
  },
  {
    name: "Wind Chimes",
    handle: "wind-chimes",
    description: "Melodious wind chimes to attract positive energy",
    is_active: true,
  },
  {
    name: "Copper Products",
    handle: "copper-products",
    description: "Pure copper vessels, pyramids, and artifacts",
    is_active: true,
  },
  {
    name: "Crystal & Gemstones",
    handle: "crystals-gemstones",
    description: "Natural crystals and gemstones for healing and Vastu",
    is_active: true,
  },
  {
    name: "Spiritual Decor",
    handle: "spiritual-decor",
    description: "Sacred symbols, statues, and decorative items",
    is_active: true,
  },
  {
    name: "Yantras & Symbols",
    handle: "yantras-symbols",
    description: "Energized yantras and sacred geometry symbols",
    is_active: true,
  },
]

// Products with comprehensive details
const products = [
  // Featured Products
  {
    title: "Copper Vastu Pyramid - Premium",
    subtitle: "Handcrafted 24K gold-plated pyramid",
    description: `A masterpiece of Vastu science, this premium copper pyramid is handcrafted by skilled artisans and features 24K gold plating for enhanced energy conductivity. Perfect for meditation rooms, offices, and living spaces.

Features:
- Pure copper with 24K gold plating
- Precisely aligned to cardinal directions
- Energized with Vedic mantras
- Comes with authentication certificate
- Ideal for spaces up to 1000 sq ft

Benefits:
- Balances earth's magnetic field
- Enhances concentration and meditation
- Neutralizes negative energies
- Promotes harmony and prosperity`,
    handle: "copper-vastu-pyramid-premium",
    status: "published",
    tags: [{ value: "featured" }, { value: "bestseller" }],
    category: "vastu-pyramids",
    variants: [
      {
        title: "Small (3 inch)",
        sku: "VP-CU-GP-SM-001",
        manage_inventory: true,
        inventory_quantity: 15,
        prices: [
          { amount: 349900, currency_code: "inr" }, // ₹3,499
          { amount: 4999, currency_code: "usd" }, // $49.99
        ],
      },
      {
        title: "Medium (5 inch)",
        sku: "VP-CU-GP-MD-001",
        manage_inventory: true,
        inventory_quantity: 10,
        prices: [
          { amount: 549900, currency_code: "inr" }, // ₹5,499
          { amount: 6999, currency_code: "usd" }, // $69.99
        ],
      },
      {
        title: "Large (7 inch)",
        sku: "VP-CU-GP-LG-001",
        manage_inventory: true,
        inventory_quantity: 5,
        prices: [
          { amount: 799900, currency_code: "inr" }, // ₹7,999
          { amount: 9999, currency_code: "usd" }, // $99.99
        ],
      },
    ],
    metadata: {
      meta_title: "Premium Gold-Plated Copper Pyramid - VastuCart",
      meta_description: "24K gold-plated copper Vastu pyramid for powerful energy balancing",
      brand: "VastuCart Premium",
      material: "Copper with 24K gold plating",
      origin: "India",
    },
  },
  {
    title: "Brass Wind Chime - 8 Rods Harmony",
    subtitle: "Traditional Feng Shui wind chime",
    description: `Eight hollow brass rods tuned to create harmonious tones that attract prosperity and positive energy. Handcrafted with traditional designs and symbols.

Features:
- 8 precision-tuned hollow brass rods
- Decorative brass ornaments
- Weather-resistant coating
- Adjustable hanging chain
- Includes Feng Shui placement guide

Ideal Placement:
- Main entrance for wealth
- North-East for knowledge
- South-East for relationships
- Garden or balcony for overall harmony`,
    handle: "brass-wind-chime-8-rods",
    status: "published",
    tags: [{ value: "featured" }, { value: "bestseller" }],
    category: "wind-chimes",
    variants: [
      {
        title: "Standard",
        sku: "WC-BR-8R-STD-001",
        manage_inventory: true,
        inventory_quantity: 25,
        prices: [
          { amount: 149900, currency_code: "inr" }, // ₹1,499
          { amount: 1999, currency_code: "usd" }, // $19.99
        ],
      },
    ],
    metadata: {
      meta_title: "8-Rod Brass Wind Chime for Feng Shui - VastuCart",
      meta_description: "Traditional brass wind chime with 8 rods for prosperity",
      brand: "VastuCart",
      material: "Brass",
      origin: "India",
    },
  },
  {
    title: "Himalayan Salt Lamp - Natural Pink",
    subtitle: "Air purifying crystal lamp",
    description: `Authentic Himalayan pink salt lamp hand-carved from natural crystal. Acts as a natural air purifier by releasing negative ions, creating a warm, soothing ambiance perfect for bedrooms and meditation spaces.

Health Benefits:
- Releases negative ions to purify air
- Reduces allergens and pollutants
- Improves sleep quality
- Eases stress and anxiety
- Creates calming ambiance

Features:
- 100% authentic Himalayan salt
- Hand-carved unique shape
- Wooden base with dimmer switch
- UL-certified cord and bulb
- Each piece is unique`,
    handle: "himalayan-salt-lamp-pink",
    status: "published",
    tags: [{ value: "featured" }],
    category: "crystals-gemstones",
    variants: [
      {
        title: "Small (2-3 kg)",
        sku: "SL-HP-2K-001",
        manage_inventory: true,
        inventory_quantity: 20,
        prices: [
          { amount: 129900, currency_code: "inr" }, // ₹1,299
          { amount: 1799, currency_code: "usd" }, // $17.99
        ],
      },
      {
        title: "Medium (4-6 kg)",
        sku: "SL-HP-4K-001",
        manage_inventory: true,
        inventory_quantity: 15,
        prices: [
          { amount: 199900, currency_code: "inr" }, // ₹1,999
          { amount: 2499, currency_code: "usd" }, // $24.99
        ],
      },
      {
        title: "Large (7-9 kg)",
        sku: "SL-HP-7K-001",
        manage_inventory: true,
        inventory_quantity: 8,
        prices: [
          { amount: 299900, currency_code: "inr" }, // ₹2,999
          { amount: 3499, currency_code: "usd" }, // $34.99
        ],
      },
    ],
    metadata: {
      meta_title: "Authentic Himalayan Pink Salt Lamp - VastuCart",
      meta_description: "Natural air purifier with warm glow for better sleep",
      brand: "VastuCart Wellness",
      material: "Himalayan Pink Salt",
      origin: "Pakistan (Khewra Salt Mines)",
    },
  },

  // Bestsellers
  {
    title: "Gomti Chakra Set - 11 Pieces",
    subtitle: "Sacred shells for Vastu correction",
    description: `Authentic Gomti Chakras (sacred shells) from the Gomti river. Used for Vastu correction, wealth attraction, and protection. Each chakra is carefully selected, cleansed, and energized.

Traditional Uses:
- Vastu defect correction
- Wealth and prosperity rituals
- Protection from evil eye
- Good luck charm
- Meditation and prayer

Set Includes:
- 11 natural Gomti Chakras
- Silk pouch for storage
- Energization certificate
- Detailed usage guide`,
    handle: "gomti-chakra-set-11",
    status: "published",
    tags: [{ value: "bestseller" }],
    category: "spiritual-decor",
    variants: [
      {
        title: "Premium Quality",
        sku: "GC-NT-11P-PRE-001",
        manage_inventory: true,
        inventory_quantity: 50,
        prices: [
          { amount: 39900, currency_code: "inr" }, // ₹399
          { amount: 599, currency_code: "usd" }, // $5.99
        ],
      },
    ],
    metadata: {
      meta_title: "Gomti Chakra Set of 11 - Sacred Shells for Vastu",
      meta_description: "Energized Gomti Chakras for wealth and protection",
      brand: "VastuCart",
      material: "Natural Shell",
      origin: "India",
    },
  },
  {
    title: "Brass Tortoise - Vastu Symbol",
    subtitle: "Lord Vishnu's Kurma Avatar",
    description: `Beautifully crafted brass tortoise representing Lord Vishnu's Kurma avatar. Symbol of longevity, stability, and protection.

Vastu Guidelines:
- North direction: Career growth and opportunities
- Living room: Family harmony and stability
- Office desk: Professional success
- Entrance: Protection and prosperity

Specifications:
- High-quality brass construction
- Detailed hand-carved design
- Polished finish
- Felt bottom to protect surfaces`,
    handle: "brass-tortoise-vastu",
    status: "published",
    tags: [{ value: "bestseller" }],
    category: "spiritual-decor",
    variants: [
      {
        title: "Small (2 inch)",
        sku: "VT-BR-SM-002",
        manage_inventory: true,
        inventory_quantity: 30,
        prices: [
          { amount: 59900, currency_code: "inr" }, // ₹599
          { amount: 899, currency_code: "usd" }, // $8.99
        ],
      },
      {
        title: "Medium (4 inch)",
        sku: "VT-BR-MD-002",
        manage_inventory: true,
        inventory_quantity: 20,
        prices: [
          { amount: 119900, currency_code: "inr" }, // ₹1,199
          { amount: 1599, currency_code: "usd" }, // $15.99
        ],
      },
      {
        title: "Large (6 inch)",
        sku: "VT-BR-LG-002",
        manage_inventory: true,
        inventory_quantity: 10,
        prices: [
          { amount: 189900, currency_code: "inr" }, // ₹1,899
          { amount: 2499, currency_code: "usd" }, // $24.99
        ],
      },
    ],
    metadata: {
      meta_title: "Brass Vastu Tortoise - Symbol of Stability",
      meta_description: "Hand-carved brass tortoise for career and family harmony",
      brand: "VastuCart",
      material: "Brass",
      origin: "India",
    },
  },

  // New Arrivals
  {
    title: "Crystal Quartz Cluster - Natural",
    subtitle: "Amplify energy and clarity",
    description: `Natural clear quartz crystal cluster from Brazil. Known as the "Master Healer," clear quartz amplifies energy and thought, as well as the effect of other crystals.

Properties:
- Amplifies intentions and energy
- Enhances clarity of thought
- Balances all chakras
- Natural air purifier
- Unique formation

Care Instructions:
- Cleanse under running water monthly
- Charge under moonlight
- Keep away from direct sunlight
- Handle with care (natural mineral)`,
    handle: "crystal-quartz-cluster-natural",
    status: "published",
    tags: [{ value: "new" }],
    category: "crystals-gemstones",
    variants: [
      {
        title: "Small (100-200g)",
        sku: "CQ-CL-SM-001",
        manage_inventory: true,
        inventory_quantity: 12,
        prices: [
          { amount: 89900, currency_code: "inr" }, // ₹899
          { amount: 1299, currency_code: "usd" }, // $12.99
        ],
      },
      {
        title: "Medium (200-400g)",
        sku: "CQ-CL-MD-001",
        manage_inventory: true,
        inventory_quantity: 8,
        prices: [
          { amount: 159900, currency_code: "inr" }, // ₹1,599
          { amount: 2199, currency_code: "usd" }, // $21.99
        ],
      },
    ],
    metadata: {
      meta_title: "Natural Clear Quartz Crystal Cluster - VastuCart",
      meta_description: "Brazilian quartz cluster for energy amplification",
      brand: "VastuCart Crystals",
      material: "Natural Clear Quartz",
      origin: "Brazil",
    },
  },
  {
    title: "Sri Yantra - Copper Plate",
    subtitle: "Sacred geometry for abundance",
    description: `Hand-engraved Sri Yantra on pure copper plate. The most powerful yantra in Vedic tradition, representing the union of Shiva and Shakti.

Significance:
- Attracts wealth and abundance
- Enhances spiritual growth
- Removes obstacles
- Brings peace and harmony
- Sacred geometry benefits

Specifications:
- Pure copper construction
- Precision-engraved design
- Can be wall-mounted or placed on altar
- Comes with stand
- Energized with mantras`,
    handle: "sri-yantra-copper-plate",
    status: "published",
    tags: [{ value: "new" }],
    category: "yantras-symbols",
    variants: [
      {
        title: "6 inch",
        sku: "SY-CP-6I-001",
        manage_inventory: true,
        inventory_quantity: 15,
        prices: [
          { amount: 249900, currency_code: "inr" }, // ₹2,499
          { amount: 3299, currency_code: "usd" }, // $32.99
        ],
      },
      {
        title: "9 inch",
        sku: "SY-CP-9I-001",
        manage_inventory: true,
        inventory_quantity: 10,
        prices: [
          { amount: 399900, currency_code: "inr" }, // ₹3,999
          { amount: 5299, currency_code: "usd" }, // $52.99
        ],
      },
    ],
    metadata: {
      meta_title: "Sri Yantra Copper Plate - Sacred Geometry",
      meta_description: "Hand-engraved Sri Yantra for abundance and prosperity",
      brand: "VastuCart Premium",
      material: "Pure Copper",
      origin: "India",
    },
  },

  // Deal Products
  {
    title: "Copper Water Bottle - Pure",
    subtitle: "Ayurvedic health benefits",
    description: `100% pure copper water bottle with leak-proof cap. Store water overnight and drink in the morning for Ayurvedic health benefits.

Health Benefits:
- Balances pH levels
- Improves digestion
- Supports weight loss
- Anti-aging properties
- Natural antimicrobial

Features:
- 100% pure copper (no lining)
- Leak-proof cap
- 1 liter capacity
- Easy to clean
- Includes care instructions`,
    handle: "copper-water-bottle-pure",
    status: "published",
    tags: [{ value: "deal" }],
    category: "copper-products",
    variants: [
      {
        title: "1 Liter",
        sku: "CWB-PU-1L-001",
        manage_inventory: true,
        inventory_quantity: 40,
        prices: [
          { amount: 79900, currency_code: "inr" }, // ₹799 (was ₹1,299)
          { amount: 1199, currency_code: "usd" }, // $11.99 (was $16.99)
        ],
      },
    ],
    metadata: {
      meta_title: "Pure Copper Water Bottle 1L - Ayurvedic Benefits",
      meta_description: "100% copper bottle for alkaline water and health",
      brand: "VastuCart Wellness",
      material: "Pure Copper",
      origin: "India",
    },
  },
  {
    title: "Bamboo Wind Chime - Natural",
    subtitle: "Eco-friendly melodious chimes",
    description: `Handcrafted bamboo wind chime with natural finish. Eco-friendly and produces gentle, soothing sounds.

Features:
- Sustainable bamboo construction
- Natural coconut shell striker
- Weather-resistant coating
- Adjustable cord
- Lightweight and durable

Perfect For:
- Balcony or patio
- Garden decoration
- Eco-conscious buyers
- Gift option`,
    handle: "bamboo-wind-chime-natural",
    status: "published",
    tags: [{ value: "deal" }],
    category: "wind-chimes",
    variants: [
      {
        title: "Standard",
        sku: "WC-BM-NAT-001",
        manage_inventory: true,
        inventory_quantity: 35,
        prices: [
          { amount: 49900, currency_code: "inr" }, // ₹499 (was ₹799)
          { amount: 799, currency_code: "usd" }, // $7.99 (was $10.99)
        ],
      },
    ],
    metadata: {
      meta_title: "Natural Bamboo Wind Chime - Eco-Friendly",
      meta_description: "Handcrafted bamboo chime with gentle sounds",
      brand: "VastuCart Eco",
      material: "Bamboo",
      origin: "India",
    },
  },

  // Additional Regular Products
  {
    title: "Laughing Buddha - Brass",
    subtitle: "Attract wealth and happiness",
    description: `Golden brass laughing Buddha statue. Symbol of wealth, prosperity, and happiness. Place in living room or office for positive energy.

Placement Guidelines:
- East: Health and family
- Southeast: Wealth
- Northwest: Luck and opportunities
- Living room: Happiness`,
    handle: "laughing-buddha-brass",
    status: "published",
    tags: [],
    category: "spiritual-decor",
    variants: [
      {
        title: "Small (4 inch)",
        sku: "LB-BR-SM-001",
        manage_inventory: true,
        inventory_quantity: 25,
        prices: [
          { amount: 69900, currency_code: "inr" },
          { amount: 999, currency_code: "usd" },
        ],
      },
      {
        title: "Medium (6 inch)",
        sku: "LB-BR-MD-001",
        manage_inventory: true,
        inventory_quantity: 15,
        prices: [
          { amount: 129900, currency_code: "inr" },
          { amount: 1699, currency_code: "usd" },
        ],
      },
    ],
    metadata: {
      meta_title: "Brass Laughing Buddha - Prosperity Symbol",
      meta_description: "Traditional brass Buddha for wealth and happiness",
      brand: "VastuCart",
      material: "Brass",
      origin: "India",
    },
  },
  {
    title: "Copper Pyramid - Standard",
    subtitle: "Entry-level Vastu pyramid",
    description: `Affordable copper pyramid for Vastu correction. Perfect for beginners or smaller spaces.

Features:
- Pure copper construction
- Basic energization
- Suitable for rooms up to 500 sq ft
- Includes placement guide`,
    handle: "copper-pyramid-standard",
    status: "published",
    tags: [],
    category: "vastu-pyramids",
    variants: [
      {
        title: "Small (3 inch)",
        sku: "VP-CU-ST-SM-001",
        manage_inventory: true,
        inventory_quantity: 30,
        prices: [
          { amount: 149900, currency_code: "inr" },
          { amount: 1999, currency_code: "usd" },
        ],
      },
    ],
    metadata: {
      meta_title: "Standard Copper Vastu Pyramid - Affordable",
      meta_description: "Entry-level copper pyramid for Vastu correction",
      brand: "VastuCart",
      material: "Copper",
      origin: "India",
    },
  },
]

async function seedComprehensive() {
  console.log("🌱 Starting comprehensive seeding...\n")

  try {
    // Step 1: Create Categories
    console.log("📁 Creating categories...")
    const createdCategories: Record<string, string> = {}

    for (const categoryData of categories) {
      try {
        console.log(`  Creating category: ${categoryData.name}...`)
        const { product_category } = await medusa.admin.productCategory.create(categoryData as any)
        createdCategories[categoryData.handle] = product_category.id
        console.log(`  ✅ Created: ${product_category.name} (ID: ${product_category.id})`)
      } catch (error: any) {
        console.error(`  ❌ Failed to create category ${categoryData.name}:`, error.message)
      }
    }
    console.log(`\n✅ Created ${Object.keys(createdCategories).length} categories\n`)

    // Step 2: Create Products
    console.log("📦 Creating products...")
    let successCount = 0

    for (const productData of products) {
      try {
        console.log(`  Creating: ${productData.title}...`)

        // Map category handle to ID
        const categoryIds = productData.category && createdCategories[productData.category]
          ? [createdCategories[productData.category]]
          : []

        const payload = {
          ...productData,
          category_id: categoryIds,
        }
        delete (payload as any).category

        const { product } = await medusa.admin.product.create(payload as any)

        successCount++
        console.log(`  ✅ Created: ${product.title}`)
        console.log(`     ID: ${product.id}`)
        console.log(`     Variants: ${product.variants?.length || 0}`)
        console.log(`     SKUs: ${product.variants?.map((v: any) => v.sku).join(", ")}`)
        console.log(`     Categories: ${categoryIds.length}`)
        console.log("")
      } catch (error: any) {
        console.error(`  ❌ Failed to create ${productData.title}:`, error.message)
        if (error.response?.data) {
          console.error(`     Details:`, JSON.stringify(error.response.data, null, 2))
        }
        console.log("")
      }
    }

    console.log("✅ Comprehensive seeding complete!\n")
    console.log(`📊 Summary:`)
    console.log(`   Categories: ${Object.keys(createdCategories).length}/${categories.length}`)
    console.log(`   Products: ${successCount}/${products.length}`)
    console.log(`\n🌐 View your store at:`)
    console.log(`   Storefront: http://localhost:3000`)
    console.log(`   Admin: http://localhost:3000/admin/products`)

  } catch (error: any) {
    console.error("❌ Seeding failed:", error.message)
    if (error.response?.data) {
      console.error("Details:", JSON.stringify(error.response.data, null, 2))
    }
    process.exit(1)
  }
}

seedComprehensive()
