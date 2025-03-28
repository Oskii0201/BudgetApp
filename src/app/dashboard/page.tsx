import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTransactions } from "@/models/transactionModel";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return <div className="text-center mt-10 text-gray-600">Musisz być zalogowany</div>;
    }

    const transactions = await getTransactions(session.user.id);

    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <DashboardClient initialTransactions={transactions} />
        </div>
    );
}
