"use client";

import { useState } from "react";
import { Category, Transaction } from "@/types";

interface EditTransactionModalProps {
    transaction: Transaction;
    categories: Category[];
    onClose: () => void;
    onUpdate: (updated: Transaction) => void;
}

export default function EditTransactionModal({
                                                 transaction,
                                                 categories,
                                                 onClose,
                                                 onUpdate,
                                             }: EditTransactionModalProps) {
    const [form, setForm] = useState({
        amount: transaction.amount,
        note: transaction.note || "",
        categoryId: transaction.category.id,
    });

    const filteredCategories = categories.filter(c => c.type === transaction.category.type);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch(`/api/transactions/${transaction.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            const updated = await res.json();
            onUpdate(updated);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-6 rounded shadow space-y-4"
            >
                <h2 className="text-lg font-semibold">Edytuj transakcję</h2>

                <div>
                    <label className="block text-sm font-medium">Kwota</label>
                    <input
                        type="number"
                        step="0.01"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Kategoria</label>
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                        required
                    >
                        {filteredCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Notatka</label>
                    <input
                        name="note"
                        value={form.note}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>

                <div className="flex justify-between">
                    <button type="button" onClick={onClose} className="text-gray-600">
                        Anuluj
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Zapisz
                    </button>
                </div>
            </form>
        </div>
    );
}
