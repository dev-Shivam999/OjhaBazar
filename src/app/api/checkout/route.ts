import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/DB";
import Razorpay from "razorpay";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/auth";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, address } = await req.json();
        if (!productId || !address) {
            return NextResponse.json({ error: "Product ID and address are required" }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const order = await prisma.order.create({
            data: {
                //@ts-ignore
                userId: session.user.id,
                totalAmount: product.price,
                addressId: address,
                status: "PROCESSING",
                orderItems: {
                    create: {
                        price: product.price,
                        productId: productId,
                        quantity: 1
                    }
                }
            },
        });

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: product.price * 100, // Razorpay accepts amount in paise
            currency: "INR",
            receipt: order.id,
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            razorpayOrderId: razorpayOrder.id,
            amount: product.price * 100,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
