import {
  MedusaContainer,
  ProductCategoryService,
  ProductService,
  RegionService,
  StoreService
} from "@medusajs/framework"

export default async function seedData(container: MedusaContainer) {
  const productCategoryService = container.resolve<ProductCategoryService>("productCategoryService")
  const productService = container.resolve<ProductService>("productService")
  const regionService = container.resolve<RegionService>("regionService")
  const storeService = container.resolve<StoreService>("storeService")

  console.log("🌱 Starting VastuCart database seeding...")

  // Step 1: Set up default store and regions
  console.log("\n📍 Setting up regions and currencies...")

  const indiaRegion = await regionService.create({
    name: "India",
    currency_code: "inr",
    countries: ["in"],
  })

  const internationalRegion = await regionService.create({
    name: "International",
    currency_code: "usd",
    countries: ["us", "gb", "ca", "au"],
  })

  console.log("✅ Regions created: India (INR), International (USD)")

  // Step 2: Create product categories
  console.log("\n📁 Creating product categories...")

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

  const createdCategories: Record<string, any> = {}

  for (const category of categories) {
    const created = await productCategoryService.create(category)
    createdCategories[category.handle] = created
    console.log(`  ✓ ${category.name}`)
  }

  console.log(`✅ Created ${categories.length} categories`)

  // Step 3: Create products
  console.log("\n📦 Creating products...")

  const products = [
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
      category: "vastu-pyramids",
      tags: ["featured", "bestseller"],
      variants: [
        {
          title: "Small (3 inch)",
          sku: "VP-CU-GP-SM-001",
          manage_inventory: true,
          inventory_quantity: 15,
          prices: [
            { amount: 349900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 4999, currency_code: "usd", region_id: internationalRegion.id },
          ],
        },
        {
          title: "Medium (5 inch)",
          sku: "VP-CU-GP-MD-001",
          manage_inventory: true,
          inventory_quantity: 10,
          prices: [
            { amount: 549900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 6999, currency_code: "usd", region_id: internationalRegion.id },
          ],
        },
        {
          title: "Large (7 inch)",
          sku: "VP-CU-GP-LG-001",
          manage_inventory: true,
          inventory_quantity: 5,
          prices: [
            { amount: 799900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 9999, currency_code: "usd", region_id: internationalRegion.id },
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
      category: "wind-chimes",
      tags: ["featured", "bestseller"],
      variants: [
        {
          title: "Standard",
          sku: "WC-BR-8R-STD-001",
          manage_inventory: true,
          inventory_quantity: 25,
          prices: [
            { amount: 149900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 1999, currency_code: "usd", region_id: internationalRegion.id },
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
      category: "crystals-gemstones",
      tags: ["featured"],
      variants: [
        {
          title: "Small (2-3 kg)",
          sku: "SL-HP-2K-001",
          manage_inventory: true,
          inventory_quantity: 20,
          prices: [
            { amount: 129900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 1799, currency_code: "usd", region_id: internationalRegion.id },
          ],
        },
        {
          title: "Medium (4-6 kg)",
          sku: "SL-HP-4K-001",
          manage_inventory: true,
          inventory_quantity: 15,
          prices: [
            { amount: 199900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 2499, currency_code: "usd", region_id: internationalRegion.id },
          ],
        },
        {
          title: "Large (7-9 kg)",
          sku: "SL-HP-7K-001",
          manage_inventory: true,
          inventory_quantity: 8,
          prices: [
            { amount: 299900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 3499, currency_code: "usd", region_id: internationalRegion.id },
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
      category: "spiritual-decor",
      tags: ["bestseller"],
      variants: [
        {
          title: "Premium Quality",
          sku: "GC-NT-11P-PRE-001",
          manage_inventory: true,
          inventory_quantity: 50,
          prices: [
            { amount: 39900, currency_code: "inr", region_id: indiaRegion.id },
            { amount: 599, currency_code: "usd", region_id: internationalRegion.id },
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
  ]

  for (const productData of products) {
    const { category, tags, variants, ...productInfo } = productData

    const product = await productService.create({
      ...productInfo,
      categories: [{ id: createdCategories[category].id }],
      tags: tags.map(tag => ({ value: tag })),
      options: variants.length > 1 ? [{
        title: "Size",
        values: variants.map(v => v.title)
      }] : [],
    })

    // Create variants with prices
    for (const variantData of variants) {
      const { prices, ...variantInfo } = variantData
      await productService.createVariant(product.id, {
        ...variantInfo,
        prices,
      })
    }

    console.log(`  ✓ ${productData.title}`)
  }

  console.log(`✅ Created ${products.length} products`)
  console.log("\n🎉 VastuCart seeding complete!")
  console.log("\n📊 Summary:")
  console.log(`  - Regions: 2 (India INR, International USD)`)
  console.log(`  - Categories: ${categories.length}`)
  console.log(`  - Products: ${products.length}`)
}
