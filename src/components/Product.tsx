"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export const Products = ({ products }: { products: any }) => {
    const { data: session } = useSession();

    const AddToCart = async (id: string) => {
        if (!session?.user) {
            alert("Please login first");
            return;
        }

        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: id,
                    //@ts-ignore
                    userId: session.user?.id,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Product added to cart!");
            } else {
                alert(`Error: ${data.message}`);
            }

        } catch (error) {
            console.error("AddToCart Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div>
            <h1>Products</h1>

            <ul className="grid grid-cols-1 sm:grid-cols-3">
                {products.map((product: any) => (
                    <li key={product.id} className="border p-4">
                        <Link href={`/product/${product.id}`}>
                            <div>
                                <h2>{product.title}</h2>
                             

                                <img src={product.imageUrl} alt="product image" className="w-[300px] h-[300px] rounded-xl object-cover object-center " />
                                <p>{product.description.toString().slice(0,30)}</p>
                                <div>Stock: {product.stock}</div>
                                <p>Price: ${Number(product.price)}</p>
                            </div>
                        </Link>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => AddToCart(product.id)}
                                className={`p-3 rounded-md ${product.stock === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                                disabled={product.stock === 0}
                            >
                                Add to Cart
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 p-3 rounded-md">
                                Buy Now
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
