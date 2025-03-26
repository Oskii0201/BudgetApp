import { prisma } from "@/lib/db";

export const getAllCategories = async () => {
    return prisma.category.findMany({
        orderBy: { name: "asc" },
    });
};
