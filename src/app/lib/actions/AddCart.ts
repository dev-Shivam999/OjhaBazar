"use server";

import db from "@/db/DB";

export async function addToCart(productId: string, userId: string) {
    let cart = await db.cart.findUnique({
        where: { userId },
        include: { items: true },
    });

    if (!cart) {
        //@ts-ignore
        cart = await db.cart.create({
            data: { userId },
        });
    }

    const existingCartItem = await db.cartItem.findFirst({
        //@ts-ignore
        where: { cartId: cart.id, productId },
    });

    if (existingCartItem) {
        await db.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + 1 },
        });
    } else {
        await db.cartItem.create({
            data: {
                //@ts-ignore
                cartId: cart.id,
                productId,
                quantity: 1,
            },
        });
    }

    return { success: "Product added to cart" };
}
