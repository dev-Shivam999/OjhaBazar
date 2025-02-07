import { addToCart } from "@/app/lib/actions/AddCart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { productId, userId } = await req.json();
        console.log("Received request:", { productId, userId });

        if (!productId || !userId) {
            return NextResponse.json({ error: "Missing productId or userId" }, { status: 400 });
        }

        const result = await addToCart(productId, userId);
        return NextResponse.json(result);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
