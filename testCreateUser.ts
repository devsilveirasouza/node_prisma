import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const email = "admin.test@example.com";
    const name = "Test Admin User";

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      console.log("User already exists");
    } else {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          updated_at: new Date(), 
        },
      });
      console.log("User created:", user);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
