"use client";

import {useEffect, useState} from "react";
import {Category, Transaction} from "@/types";
import AddTransactionForm from "./AddTransactionForm";
import EditTransactionModal from "@/components/EditTransactionModal";

interface Props {
    initialTransactions: Transaction[];
}

export default function DashboardClient({ initialTransactions }: Props) {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editModal, setEditModal] = useState<Transaction | null>(null)

    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(setCategories);
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Na pewno usunąć?");
        if (!confirmed) return;

        await fetch(`/api/transactions/${id}`, { method: "DELETE" });

        // Odśwież dane lokalnie
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const incomeTotal = transactions
        .filter(t => t.category.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const expenseTotal = transactions
        .filter(t => t.category.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <>
            <div className="flex justify-between bg-gray-100 p-4 rounded shadow mb-6">
                <div>
                    <p className="text-sm text-gray-500">Przychody</p>
                    <p className="text-green-600 font-bold">{incomeTotal.toFixed(2)} zł</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Wydatki</p>
                    <p className="text-red-600 font-bold">{expenseTotal.toFixed(2)} zł</p>
                </div>
            </div>

            {categories.length > 0 && <AddTransactionForm initCategories={categories}/>}

            <h2 className="mt-8 mb-2 text-lg font-semibold">Historia transakcji</h2>
            <ul className="space-y-2">
                {transactions.map(t => (
                    <li key={t.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">{t.category.name}</p>
                            <p className="text-xs text-gray-400">{t.note}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <p
                                className={`font-medium ${
                                    t.category.type === "income" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {t.category.type === "income" ? "+" : "-"} {t.amount} zł
                            </p>
                            <button
                                onClick={() => handleDelete(t.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                                title="Usuń transakcję"
                            >
                                🗑️
                            </button>
                            <button
                                onClick={() => setEditModal(t)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                title="Edytuj transakcję"
                            >
                                ✏️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {editModal && (
                <EditTransactionModal
                    transaction={editModal}
                    categories={categories}
                    onClose={() => setEditModal(null)}
                    onUpdate={(updated) => {
                        setTransactions(prev =>
                            prev.map(t => (t.id === updated.id ? updated : t))
                        );
                    }}
                />
            )}
        </>
    );
}
