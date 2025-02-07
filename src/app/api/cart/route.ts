
import prisma from "@/db/DB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        
        const { productId, userID } = await req.json();

        if (!productId || !userID) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }
        const cartItem = await prisma.cart.create({
            data: {
                userId: userID,
                items: {
                    create: {
                        productId,
                    },
                },
            
                
            },
        });

        return NextResponse.json({ message: "Added to cart", cartItem }, { status: 201 });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
