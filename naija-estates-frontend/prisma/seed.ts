import { PrismaClient, PropertyType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database with realistic mock data...');

  // Create an Agent user
  const agent = await prisma.user.upsert({
    where: { email: 'agent@naijaestates.com' },
    update: {},
    create: {
      email: 'agent@naijaestates.com',
      name: 'Chinedu Real Estate Ltd',
      password: 'password123', // In a real app, hash this!
      role: 'AGENT',
    },
  });

  console.log(`Created agent with id: ${agent.id}`);

  // Real-world inspired mock properties
  const properties = [
    {
      title: 'Luxury 3-Bedroom Apartment in Lekki Phase 1',
      description: 'A beautiful, fully serviced 3-bedroom apartment with a BQ, swimming pool, 24/7 power, and high-end security. Perfect for expatriates and families.',
      price: 15000000, // 15 million NGN / year
      type: PropertyType.APARTMENT,
      address: 'Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.4446,
      lng: 3.4731,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Cozy Mini Flat in Yaba',
      description: 'Newly renovated mini flat (room and parlor) in a serene environment in Yaba. Proximity to UNILAG and tech hubs.',
      price: 1200000, // 1.2 million NGN / year
      type: PropertyType.APARTMENT,
      address: 'Herbert Macaulay Way, Yaba',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.5095,
      lng: 3.3711,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1e5240980c?w=800&q=80',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Spacious Office Space in Victoria Island',
      description: '100sqm open-plan office space on the 3rd floor of a commercial building. Comes with elevator, central AC, and parking.',
      price: 10000000, // 10 million NGN / year
      type: PropertyType.SHOP,
      address: 'Adeola Odeku Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.4300,
      lng: 3.4211,
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: '4-Bedroom Duplex in Maitama',
      description: 'Elegant 4-bedroom detached duplex with boys quarters, fitted kitchen, and ample parking space in the heart of Abuja.',
      price: 25000000, // 25 million NGN / year
      type: PropertyType.HOUSE,
      address: 'Gana Street, Maitama',
      city: 'Abuja',
      state: 'FCT',
      lat: 9.0833,
      lng: 7.4981,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Commercial Shop at Trade Fair Complex',
      description: 'Standard shop space available for lease at the busy Trade Fair Complex. High foot traffic guaranteed.',
      price: 800000, // 800k NGN / year
      type: PropertyType.SHOP,
      address: 'Trade Fair Complex, Ojo',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.4673,
      lng: 3.2559,
      imageUrl: 'https://images.unsplash.com/photo-1580913428706-c311e67898b3?w=800&q=80',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Plot of Land in Ibeju-Lekki',
      description: 'Dry land measuring 600sqm in a fast-developing estate in Ibeju-Lekki. Good title (C of O).',
      price: 5000000, // 5 million NGN (Outright)
      type: PropertyType.LAND,
      address: 'Eleko, Ibeju-Lekki',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.4600,
      lng: 3.9000,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      isAvailable: true,
      agentId: agent.id,
    }
  ];

  for (const p of properties) {
    await prisma.property.create({
      data: p
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
