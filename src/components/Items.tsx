import React from 'react';
import prisma from "@/db/DB";
import { Products } from "@/components/Product";

const Items = async () => {
    const products = await prisma.product.findMany({
        include: { category: true },
    });



    return (

        <Products products={products} />
    );
};

export default Items;