"use client";

import { useParams } from "next/navigation";
import React from "react";

const ProductPage = () => {
    const params = useParams();
    const id = params.id as string;

    return (
        <div>
            <h1>Product ID: {id}</h1>
        </div>
    );
};

export default ProductPage;
