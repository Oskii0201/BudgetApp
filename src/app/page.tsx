import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen p-2 flex items-center justify-center bg-gray-50 md:p-6">
            <div className="max-w-2xl w-full bg-white shadow rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center">💰 Kalkulator Budżetu Osobistego</h1>

                <p className="text-gray-700 text-center">
                    Aplikacja webowa służąca do monitorowania przychodów i wydatków. Umożliwia dodawanie transakcji,
                    analizę budżetu oraz zarządzanie finansami w prosty sposób.
                </p>

                <section>
                    <h2 className="text-xl font-semibold mb-2">🛠 Technologie</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                        <li>Next.js 15 (App Router)</li>
                        <li>React + TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>NextAuth (logowanie przez email + hasło)</li>
                        <li>Prisma ORM</li>
                        <li>Baza danych: SQLite</li>
                        <li>Wzorzec MVC</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">🧱 Architektura MVC</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                        <li><strong>Model:</strong> `/models` – komunikacja z bazą danych (Prisma)</li>
                        <li><strong>Controller:</strong> `/app/api/**` – logika API i autoryzacja</li>
                        <li><strong>View:</strong> `/components`, `/app/**` – UI i interakcje</li>
                    </ul>
                </section>
                <div className="text-center">
                    <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm">
                        Zaloguj się
                    </Link>
                </div>
            </div>
        </main>
    );
}
