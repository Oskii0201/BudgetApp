# 📄 Kalkulator Budżetu Osobistego
Aplikacja webowa służąca do monitorowania przychodów i wydatków. Umożliwia dodawanie transakcji, analizę budżetu oraz zarządzanie finansami w prosty sposób.

---

## Technologie 🛠

| Area            | Tools                                                                                                                                                                                                                                                                                                                                                                                        |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**     | ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)                    |
| **Backend**      | ![Next.js API Routes](https://img.shields.io/badge/-Next.js%20API-000000?logo=nextdotjs&logoColor=white) ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white)                                                                                                                                                                                                  |
| **Database**     | ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&compact=true&logo=sqlite&logoColor=white)                                                                                                                                                                                                                                                                                                   |

---

## 🧱 Architektura MVC

Projekt został zbudowany w oparciu o wzorzec architektoniczny **MVC (Model-View-Controller)**:

- **Model (`/models`)** – bezpośrednia komunikacja z bazą danych za pomocą Prisma ORM.
- **Controller (`/app/api/**`)** – odpowiada za obsługę żądań HTTP, autoryzację i delegowanie do warstwy modelu.
- **View (`/components`, `/app/**`)** – komponenty Reacta odpowiedzialne za prezentację danych i interakcję z użytkownikiem.

Struktura została dostosowana do najnowszego App Routera w Next.js 13+, zgodnie z nowoczesnym podejściem Composable View.

---

## 🧰 Wymagania systemowe

- Node.js >= 18
- NPM >= 9
- System operacyjny: Windows / macOS / Linux

---

## 📋 Instalacja i uruchomienie

1. **Klonowanie repozytorium:**
   ```bash
    git clone https://github.com/Oskii0201/BudgetApp.git
    cd BudgetApp
   ```
2. **Zainstaluj zależności:**
   ```bash
    npm install
   ```
3. **Wygeneruj i zastosuj migracje oraz uruchom seeder:**
   ```bash
    npx prisma migrate dev --name init && npm run seed
   ```
4. **Dodaj plik .env.local:**
- Stwórz plik .env w katalogu głównym i dodaj następujące zmienne.
    ```bash
    NEXTAUTH_SECRET=your-secret-key
    NEXTAUTH_URL=host
    ```
5. **Uruchom aplikację: **
   ```bash
    npm run dev
   ```
    - Otwórz przeglądarkę i wpisz url http://localhost:3000.
    - Domyślne konto użytkownika:
      ```bash
      email: example@example.com
      password: example
      ```