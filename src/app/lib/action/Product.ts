"use server"

import client from "@/db/DB"
export const Product = async () => {
    const product = await client.product.findMany({})
    return product
}