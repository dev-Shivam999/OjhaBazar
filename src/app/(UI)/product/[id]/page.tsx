"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: {
        name:string
    };
}

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
                console.log(data);
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading product...</div>;
    }

    if (!product) {
        return <div className="text-center mt-10 text-lg font-semibold text-red-500">Product not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <div className="flex flex-col md:flex-row gap-6">
           
                <div className="w-full md:w-1/2">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-80 object-cover rounded-lg shadow" />
                </div>

              
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                        <p className="text-gray-600 text-sm mt-2">Category: <span className="font-semibold">{product.category.name}</span></p>
                        <p className="mt-4 text-lg text-gray-700">{product.description}</p>
                        <p className="mt-4 text-xl font-semibold text-blue-600">₹{product.price}</p>
                        <p className={`mt-2 ${product.stock > 0 ? "text-green-600" : "text-red-500"} font-semibold`}>
                            {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
                        </p>
                    </div>

                    <div className="mt-6">
                        <button
                            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${product.stock > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            disabled={product.stock === 0}
                        >
                            {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
