import { prisma } from "@/lib/db";
import { TransactionInput } from "@/types";

export const getTransactions = (userId: string) => {
    return prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {category: true }
    });
};

export const createTransaction = (data: TransactionInput & { userId: string }) => {
    return prisma.transaction.create({ data });
};

export const deleteTransaction = (transactionId: string) => {
    return prisma.transaction.delete({
        where: { id: transactionId }
    });
};

export const updateTransaction = (id: string, data: {
    amount: number;
    note?: string;
    categoryId: string;
}) => {
    return prisma.transaction.update({
        where: { id },
        data,
        include: { category: true },
    });
};