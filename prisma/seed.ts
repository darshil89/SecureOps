const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create first security agency and connect to existing users
  const agency1 = await prisma.agency.create({
    data: {
      name: "Secure Shield Security Services",
      email: "1ds22cg022@dsce.edu.in",
      phone: "+91 98765 43210",
      address: "Plot No. 45, Sector 2, Vashi, Navi Mumbai, Maharashtra 400703",
      description:
        "Professional security services providing trained guards for residential complexes, corporate offices, and industrial sites.",
      users: {
        connect: [
          { id: "67af0cf282a02ee8cb30b3d0" }, // Its ok
          { id: "67af0d2982a02ee8cb30b3d2" }, // JEE mains
          { id: "67af0dd382a02ee8cb30b3d4" }, // Ashab Khan
        ],
      },
    },
  });

  // Create second security agency and connect to existing users
  const agency2 = await prisma.agency.create({
    data: {
      name: "Guardian Force Security",
      email: "1ds22cb022@dsce.edu.in",
      phone: "+91 98765 12345",
      address:
        "7th Floor, Prestige Tower, MG Road, Bangalore, Karnataka 560001",
      description:
        "Leading security agency providing comprehensive security solutions including trained guards, supervisors, and security consultancy.",
      users: {
        connect: [
          { id: "67af07bc82a02ee8cb30b3ca" }, // Darshil Mahraur
          { id: "67af0bdb82a02ee8cb30b3cc" }, // S_36_ Darshil
          { id: "67af0cb582a02ee8cb30b3ce" }, // Devansh Aryan
        ],
      },
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
