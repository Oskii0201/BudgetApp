import { prisma } from "@/lib/db";

export const getAllCategories = () => {
    return prisma.category.findMany({
        orderBy: { name: "asc" }
    });
};
