import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-2xl w-full bg-white shadow rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center">💰 Kalkulator Budżetu Osobistego</h1>

                <p className="text-gray-700 text-center">
                    Aplikacja webowa służąca do monitorowania przychodów i wydatków. Umożliwia dodawanie transakcji,
                    analizę budżetu oraz zarządzanie finansami w prosty sposób.
                </p>

                <section>
                    <h2 className="text-xl font-semibold mb-2">🛠 Technologie</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Next.js 14 (App Router)</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>NextAuth (logowanie przez email + hasło)</li>
                        <li>Prisma + SQLite</li>
                        <li>Wzorzec MVC</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">⚙️ Wymagania do uruchomienia</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Node.js 18+</li>
                        <li>Plik <code>.env</code> z wartością <code>NEXTAUTH_SECRET</code></li>
                        <li>Instalacja zależności: <code>npm install</code></li>
                        <li>Migracja bazy danych: <code>npx prisma migrate dev</code></li>
                        <li>Seed danych testowych: <code>npm run seed</code></li>
                        <li>Uruchomienie: <code>npm run dev</code></li>
                    </ul>
                </section>

                <div className="text-center">
                    <Link href="/login">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Zaloguj się
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
