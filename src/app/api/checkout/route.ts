import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/DB";
import { getSession } from "next-auth/react";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, address } = await req.json();
        console.log(productId, " ", address);

        if (!productId || !address) {
            return NextResponse.json({ error: "Product ID and address are required" }, { status: 400 });
        }

        // Fetch product details
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Create order in DB
        const order = await prisma.order.create({
            data: {
                //@ts-ignore
                userId: session.user.id,
                totalAmount: product.price,
                addressId: address,
                orderItems: {

                    create: {
                        price: product.price,
                        productId: productId,
                        quantity: 1
                    }

                }

            },
        });



        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
