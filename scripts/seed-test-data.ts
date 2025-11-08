import { prisma } from '../src/lib/prisma';

async function seed() {
  console.log('Seeding test data...');

  // Create test farmers
  const farmers = [
    { name: 'Ramesh Gaoud', phone: '+919876543210', district: 'Warangal' },
    { name: 'Krishna Reddy', phone: '+919876543211', district: 'Karimnagar' },
  ];

  for (const farmer of farmers) {
    await prisma.user.create({
      data: {
        name: farmer.name,
        phone: farmer.phone,
        preferredLang: 'te',
        farmerProfile: {
          create: {
            district: farmer.district,
            farmSize: 5.0,
            primaryCrops: ['Paddy', 'Cotton'],
          },
        },
      },
    });
  }

  console.log('✓ Seeded test data');
}

seed();
