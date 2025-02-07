"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/auth";
import db from "@/db/DB";

export async function getCart() {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    if (!session?.user?.id) {
        console.log("No user session found");
        return null;
    } 

    const cart = await db.cart.findUnique({
        //@ts-ignore
        where: { userId: session.user.id },
        include: { items: { include: { product: true } } },
    });

    return cart;
}
