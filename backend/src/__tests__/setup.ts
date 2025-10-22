import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db'
    }
  }
});

// Clean up database before each test
beforeEach(async () => {
  try {
    await prisma.generation.deleteMany();
    await prisma.user.deleteMany();
  } catch (error) {
    console.warn('Database cleanup failed:', error);
  }
});

// Clean up after all tests
afterAll(async () => {
  await prisma.$disconnect();
});

// Mock environment variables
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.FRONTEND_URL = 'http://localhost:3000';
process.env.NODE_ENV = 'test';
