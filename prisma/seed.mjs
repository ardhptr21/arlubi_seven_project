import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@arlubi.com' },
    update: {
      role: 'admin',
    },
    create: {
      name: 'Admin',
      email: 'admin@arlubi.com',
      password: await bcrypt.hash('admin', 10),
      role: 'admin',
    },
  });

  console.log(admin);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
