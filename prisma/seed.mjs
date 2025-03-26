import { PrismaClient } from "@prisma/client";
import {hashSync} from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "example@example.com";
    const plainPassword = "example";
    const password = hashSync(plainPassword, 10);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        console.log("Użytkownik już istnieje – pomijam seeda.");
        return;
    }

    const user = await prisma.user.create({
        data: { email, password }
    });

    const defaultCategories = [
        { name: "Wynagrodzenie", type: "income" },
        { name: "Freelance", type: "income" },
        { name: "Jedzenie", type: "expense" },
        { name: "Transport", type: "expense" },
        { name: "Mieszkanie", type: "expense" },
        { name: "Rozrywka", type: "expense" },
        { name: "Zakupy", type: "expense" }
    ];

    await prisma.category.createMany({
        data: defaultCategories
    });

    const allCategories = await prisma.category.findMany();
    const categoriesMap = Object.fromEntries(
        allCategories.map(c => [c.name, c.id])
    );

    await prisma.transaction.createMany({
        data: [
            {
                amount: 3000,
                note: "Pensja",
                categoryId: categoriesMap["Wynagrodzenie"],
                userId: user.id
            },
            {
                amount: 180,
                note: "Bilet miesięczny",
                categoryId: categoriesMap["Transport"],
                userId: user.id
            }
        ]
    });

    console.log("✅ Seeder zakończony pomyślnie.");
    console.log(`📧 Login: ${email}`);
    console.log(`🔐 Hasło: ${plainPassword}`);
}

main()
    .catch(e => {
        console.error("❌ Błąd podczas seeda:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
