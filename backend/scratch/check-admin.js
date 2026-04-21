const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAdmin() {
  const admins = await prisma.admin.findMany();
  console.log("Admins in DB:", admins.map(a => a.username));
  process.exit(0);
}

checkAdmin();
