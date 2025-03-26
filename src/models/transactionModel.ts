import { prisma } from "@/lib/db";
import { TransactionInput } from "@/types";

export const getTransactions = async (userId: string) => {
    return prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });
};

export const createTransaction = async (data: TransactionInput & { userId: string }) => {
    return prisma.transaction.create({ data });
};

export const deleteTransaction = async (transactionId: string) => {
    return prisma.transaction.delete({
        where: { id: transactionId },
    });
};

export const updateTransaction = async (
    id: string,
    data: { amount: number; note?: string; categoryId: string }
) => {
    return prisma.transaction.update({
        where: { id },
        data,
        include: { category: true },
    });
};
