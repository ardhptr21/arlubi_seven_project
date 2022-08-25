const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const arlubidb = require('../arlubidb.json');

async function main() {
  await prisma.user.upsert({
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

  await prisma.extracurricular.createMany({ data: arlubidb });
}

main()
  .then(() => {
    console.log('Seeding successfull');
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
