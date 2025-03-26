"use client";

import { useState } from "react";
import { Category, TransactionType } from "@/types";

interface AddTransactionFormProps {
    initCategories: Category[];
}

const defaultForm = {
    amount: 0,
    categoryId: "",
    note: "",
    type: "expense" as TransactionType,
};

export default function AddTransactionForm({ initCategories }: AddTransactionFormProps) {
    const [form, setForm] = useState(defaultForm);
    const [categories] = useState<Category[]>(initCategories);


    const filteredCategories = categories.filter(c => c.type === form.type);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { amount, categoryId, note } = form;

        await fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, categoryId, note }),
        });

        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium">Kwota</label>
                    <input
                        name="amount"
                        type="number"
                        step="0.01"
                        value={form.amount}
                        onChange={handleChange}
                        required
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium">Typ</label>
                    <select
                        name="type"
                        value={form.type}
                        onChange={(e) => {
                            const value = e.target.value as TransactionType;
                            setForm(prev => ({
                                ...prev,
                                type: value,
                                categoryId: ""
                            }));
                        }}
                        className="w-full border px-2 py-1 rounded"
                    >
                        <option value="income">Przychód</option>
                        <option value="expense">Wydatek</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Kategoria</label>
                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                    className="w-full border px-2 py-1 rounded"
                >
                    <option value="">-- Wybierz kategorię --</option>
                    {filteredCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium">Notatka (opcjonalna)</label>
                <input
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Dodaj transakcję
            </button>
        </form>
    );
}
