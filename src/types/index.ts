export type TransactionType = "income" | "expense";

export interface Category {
    id: string;
    name: string;
    type: TransactionType;
}

export interface TransactionInput {
    amount: number;
    categoryId: string;
    note?: string;
}

export interface Transaction {
    id: string;
    amount: number;
    note?: string;
    createdAt: string;
    userId: string;
    category: Category;
}
