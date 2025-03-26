import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteTransaction, updateTransaction } from "@/models/transactionModel";
import { NextRequest } from "next/server";

interface RouteParams {
    params: { id: string };
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }
    const {id} = await params;
    try {
        const deleted = await deleteTransaction(id);
        return Response.json(deleted);
    } catch (error) {
        console.error("DELETE /api/transactions/:id error:", error);
        return new Response("Failed to delete transaction", { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }
    const {id} = await params;
    try {
        const body = await req.json();
        const updated = await updateTransaction(id, body);
        return Response.json(updated);
    } catch (error) {
        console.error("PUT /api/transactions/:id error:", error);
        return new Response("Update failed", { status: 500 });
    }
}
