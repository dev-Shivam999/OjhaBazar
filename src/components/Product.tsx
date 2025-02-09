"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import CartBtn from "./CartBtn";

export const Products = ({ products }: { products: any }) => {
   

    return (
        <div>
            <h1>Products</h1>

            <ul className="grid grid-cols-1 sm:grid-cols-3">
                {products.map((product: any) => (
                    <li key={product.id} className="border  p-4">
                        <Link href={`/product/${product.id}`}>
                            <div>
                                <h2>{product.title}</h2>
                             

                                <img src={product.imageUrl} alt="product image" className="w-full h-[400px] rounded-xl object-cover object-center " />
                                <p>{product.description.toString().slice(0,30)}</p>
                                <div>Stock: {product.stock}</div>
                                <p>Price: ${Number(product.price)}</p>
                            </div>
                        </Link>

                        <div className="flex gap-2 mt-2">
                           <CartBtn ProductId={product.id} ProductSock={product.stock}/>
                            <button className="bg-green-500 hover:bg-green-600 p-3 rounded-md">
                                <Link href={`/Address/${product.id}`}>    Buy Now</Link>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
