import { PrismaClient, PropertyType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.property.deleteMany({});
  
  console.log('Seeding the database with 50 diverse properties...');

  const bcrypt = require('bcryptjs');
  const hashed = await bcrypt.hash('password123', 10);

  const agent = await prisma.user.upsert({
    where: { email: 'agent@naijaestates.com' },
    update: { password: hashed },
    create: {
      email: 'agent@naijaestates.com',
      name: 'Chinedu Real Estate Ltd',
      password: hashed,
      role: 'AGENT',
    },
  });

  const agent2 = await prisma.user.upsert({
    where: { email: 'contact@naijaspaces.com' },
    update: { password: hashed },
    create: {
      email: 'contact@naijaspaces.com',
      name: 'Naija Spaces',
      password: hashed,
      role: 'AGENT',
    },
  });
  
  const agents = [agent.id, agent2.id];

  const affordableTitles = ["Self-Contain Apartment", "1-Bedroom Flat", "Standard Shop Space", "2-Bedroom Bungalow", "Mini Flat", "Office Space", "Lock-up Shop"];
  const midRangeTitles = ["3-Bedroom Flat", "Modern Duplex", "4-Bedroom Terrace", "Serviced Apartment", "Office Complex", "Semi-Detached Duplex"];
  const highEndTitles = ["Luxury Penthouse", "Waterfront Mansion", "Diplomatic Villa", "Hilltop Estate", "5-Bedroom Detached House", "Smart Home Duplex"];

  const cities = [
    { city: "Yaba", state: "Lagos", tier: "affordable" },
    { city: "Surulere", state: "Lagos", tier: "affordable" },
    { city: "Ikeja", state: "Lagos", tier: "mid" },
    { city: "Lekki Phase 1", state: "Lagos", tier: "mid" },
    { city: "Ikoyi", state: "Lagos", tier: "high" },
    { city: "Victoria Island", state: "Lagos", tier: "high" },
    { city: "Banana Island", state: "Lagos", tier: "high" },
    
    { city: "Gwarinpa", state: "Abuja", tier: "mid" },
    { city: "Kubwa", state: "Abuja", tier: "affordable" },
    { city: "Wuse 2", state: "Abuja", tier: "mid" },
    { city: "Maitama", state: "Abuja", tier: "high" },
    { city: "Asokoro", state: "Abuja", tier: "high" },
    
    { city: "Choba", state: "Port Harcourt", tier: "affordable" },
    { city: "Rumuola", state: "Port Harcourt", tier: "mid" },
    { city: "GRA Phase 2", state: "Port Harcourt", tier: "high" },
    { city: "Peter Odili Road", state: "Port Harcourt", tier: "mid" }
  ];

  const propertyTypes = [PropertyType.APARTMENT, PropertyType.HOUSE, PropertyType.SHOP, PropertyType.LAND];

  const houseImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1e5240980c?w=800&q=80",
    "https://images.unsplash.com/photo-1613490908578-75c4d6276166?w=800&q=80"
  ];

  const shopImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?w=800&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bfc1748b565?w=800&q=80", // store
    "https://images.unsplash.com/photo-1570857502809-08184874388e?w=800&q=80", // modern office
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e07?w=800&q=80" // mall
  ];

  const generatedProperties = [];

  for (let i = 0; i < 50; i++) {
    // 30% Affordable, 40% Mid, 30% High-end
    const tierRand = Math.random();
    let tier = "mid";
    if (tierRand < 0.3) tier = "affordable";
    else if (tierRand > 0.7) tier = "high";

    const validCities = cities.filter(c => c.tier === tier);
    const location = validCities[Math.floor(Math.random() * validCities.length)];

    let titlePool = midRangeTitles;
    let basePrice = 5000000;
    
    if (tier === "affordable") {
      titlePool = affordableTitles;
      basePrice = 400000 + Math.random() * 1500000;
    } else if (tier === "high") {
      titlePool = highEndTitles;
      basePrice = 15000000 + Math.random() * 135000000;
    } else {
      basePrice = 3000000 + Math.random() * 12000000;
    }

    const periods = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
    const rentalPeriod = periods[Math.floor(Math.random() * periods.length)] as any;

    if (rentalPeriod === "DAILY") basePrice = basePrice / 300;
    else if (rentalPeriod === "WEEKLY") basePrice = basePrice / 48;
    else if (rentalPeriod === "MONTHLY") basePrice = basePrice / 12;

    const title = titlePool[Math.floor(Math.random() * titlePool.length)];
    const isShopOrOffice = title.includes("Shop") || title.includes("Office");
    const bedrooms = isShopOrOffice ? 0 : Math.floor(Math.random() * 5) + 1;
    const bathrooms = isShopOrOffice ? Math.floor(Math.random() * 2) + 1 : bedrooms + 1;
    const type = isShopOrOffice ? PropertyType.SHOP : (title.includes("Apartment") || title.includes("Flat") ? PropertyType.APARTMENT : PropertyType.HOUSE);

    const imageUrl = isShopOrOffice 
      ? shopImages[Math.floor(Math.random() * shopImages.length)]
      : houseImages[Math.floor(Math.random() * houseImages.length)];

    generatedProperties.push({
      title: `${title} in ${location.city}`,
      description: `A well-maintained ${title.toLowerCase()} located in a secure environment in ${location.city}, ${location.state}. Excellent road network and reliable power supply.`,
      price: Math.floor(basePrice),
      type: type,
      address: `Random Street, ${location.city}`,
      city: location.city,
      state: location.state,
      imageUrl: imageUrl,
      isAvailable: true,
      rentalPeriod: rentalPeriod,
      agentId: agents[Math.floor(Math.random() * agents.length)],
    });
  }

  // Insert in batches
  for (const p of generatedProperties) {
    await prisma.property.create({ data: p });
  }

  console.log('Successfully seeded 50 properties!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
