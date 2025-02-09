import prisma from "@/db/DB";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        
        const data = await prisma.$transaction(async (prisma) => {
            
            const updatedOrder = await prisma.order.update({
                where: { id: params.id },
                data: {
                    status: "PROCESSING",
                    payment: {
                        create: {
                            amount: 10,
                            provider: "card",
                            status: "SUCCESS",
                        },
                    },
                },
                include: {
                    orderItems: {
                        include: {
                            product: true, 
                        },
                    },
                },
            });

            
            for (const orderItem of updatedOrder.orderItems) {
                await prisma.product.update({
                    where: { id: orderItem.productId },
                    data: {
                        stock: {
                            decrement: orderItem.quantity, 
                        },
                    },
                });
            }

            return updatedOrder;
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}