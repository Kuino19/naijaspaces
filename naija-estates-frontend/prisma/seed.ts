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
      price: 15000000,
      type: PropertyType.APARTMENT,
      address: 'Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos',
      lat: 6.4446,
      lng: 3.4731,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Glass Penthouse Overlooking Eko Atlantic',
      description: 'Ultra-luxurious 4-bedroom penthouse offering 360-degree views of the Lagos skyline. Features private elevator access, infinity plunge pool, and smart-home automation.',
      price: 450000000,
      type: PropertyType.HOUSE,
      address: '14 Eko Atlantic Boulevard',
      city: 'Victoria Island',
      state: 'Lagos',
      lat: 6.4172,
      lng: 3.4064,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Banana Island Waterfront Mansion',
      description: 'Exquisite 7-bedroom mansion with private boat jetty. Includes cinema room, wine cellar, gym, and imported Italian marble finishes throughout.',
      price: 1200000000,
      type: PropertyType.HOUSE,
      address: '22 Ocean Parade',
      city: 'Ikoyi',
      state: 'Lagos',
      lat: 6.4554,
      lng: 3.4560,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Maitama Diplomatic Villa',
      description: 'Secure and prestigious 6-bedroom villa in the heart of Abuja. Boasts a massive courtyard, dual kitchens, bullet-resistant glass, and staff quarters.',
      price: 850000000,
      type: PropertyType.HOUSE,
      address: '7 Amazon Street',
      city: 'Maitama',
      state: 'Abuja',
      lat: 9.0833,
      lng: 7.4981,
      imageUrl: 'https://images.unsplash.com/photo-1613490908578-75c4d6276166?w=1200&q=80&auto=format&fit=crop',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Asokoro Hilltop Estate',
      description: 'Massive 8-bedroom estate sitting on an elevated plot providing panoramic views of Abuja. Features a tennis court, 10-car garage, and helipad.',
      price: 2100000000,
      type: PropertyType.HOUSE,
      address: 'Yakubu Gowon Crescent',
      city: 'Asokoro',
      state: 'Abuja',
      lat: 9.0435,
      lng: 7.5190,
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80&auto=format&fit=crop',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Wuse 2 Luxury Boutique Shop',
      description: 'High-end retail shop space situated in the bustling commercial district of Wuse 2. Floor-to-ceiling glass frontage for maximum visibility.',
      price: 150000000,
      type: PropertyType.SHOP,
      address: 'Adetokunbo Ademola Crescent',
      city: 'Wuse 2',
      state: 'Abuja',
      lat: 9.0765,
      lng: 7.4753,
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'GRA Phase 2 Modern Residence',
      description: 'Luxury 5-bedroom home in Port Harcourt\'s most exclusive neighborhood. Comes fully furnished with bespoke pieces, automated lighting, and lush gardens.',
      price: 320000000,
      type: PropertyType.HOUSE,
      address: 'King Perekule Street',
      city: 'GRA Phase 2',
      state: 'Port Harcourt',
      lat: 4.8156,
      lng: 7.0498,
      imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop',
      isAvailable: true,
      agentId: agent.id,
    },
    {
      title: 'Trans Amadi Commercial Plaza',
      description: 'Prime retail and office space in Port Harcourt. High foot traffic, modern architecture, and ample underground parking. Perfect for corporate headquarters.',
      price: 450000000,
      type: PropertyType.SHOP,
      address: 'Trans Amadi Industrial Layout',
      city: 'Trans Amadi',
      state: 'Port Harcourt',
      lat: 4.8110,
      lng: 7.0274,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop',
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
