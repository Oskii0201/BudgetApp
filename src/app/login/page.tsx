"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.error) {
            setError("Nieprawidłowe dane logowania");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Zaloguj się</h2>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Hasło</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Zaloguj
                </button>
            </form>
        </div>
    );
}
