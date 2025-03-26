import { getAllCategories } from "@/models/categoryModel";

export async function GET() {
    try {
        const data = await getAllCategories();
        return Response.json(data);
    } catch (error) {
        console.error("GET /api/categories error:", error);
        return new Response("Failed to fetch categories", { status: 500 });
    }
}
