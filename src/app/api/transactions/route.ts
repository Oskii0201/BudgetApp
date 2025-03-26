import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createTransaction, getTransactions } from "@/models/transactionModel";
import { NextRequest } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const transactions = await getTransactions(session.user.id);
        return Response.json(transactions);
    } catch (error) {
        console.error("GET /api/transactions error:", error);
        return new Response("Failed to fetch transactions", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const created = await createTransaction({ ...body, userId: session.user.id });
        return Response.json(created);
    } catch (error) {
        console.error("POST /api/transactions error:", error);
        return new Response("Failed to create transaction", { status: 500 });
    }
}