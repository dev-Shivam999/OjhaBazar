import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/db/DB";

export async function POST(req: NextRequest) {
    try {
        const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = await req.json();

        const body = `${razorpayOrderId}|${razorpayPaymentId}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET!)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpaySignature) {
            return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 });
        }

        
        await prisma.order.update({
            where: { id: orderId },
            data: { status: "SHIPPED" },
        });

        return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
    }
}
