import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {deleteTransaction, updateTransaction} from "@/models/transactionModel";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

    const {id} = await params;
    try {
        const deleted = await deleteTransaction(id);
        return Response.json(deleted);
    } catch (error) {
        return new Response("Failed to delete transaction", { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

    const {id} = await params;
    try {
        const body = await req.json();
        const updated = await updateTransaction(id, body);
        return Response.json(updated);
    } catch (error) {
        return new Response("Update failed", { status: 500 });
    }
}