const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seedAdmin() {
  const username = "bryanalberta";
  const password = "Claireredfield404?";
  
  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    console.log("Admin already exists.");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: { username, password: hashedPassword }
    });
    console.log("Admin bryanalberta created successfully.");
  }
  process.exit(0);
}

seedAdmin();
