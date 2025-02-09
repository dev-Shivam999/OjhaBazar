"use client"

import { getCart } from "@/app/lib/actions/Cart";
import { useEffect, useMemo, useState } from "react";
interface Cart { product: { id: string; price: number; imageUrl: string; title: string; description: string; stock: number; categoryId: string; createdAt: Date; }; }
type Data = Cart & {
    id: string; cartId: string; productId: string; quantity: number;
}
export default function CartPage() {
    const [cart, setCart] = useState<Data[] | undefined>(undefined)
    useEffect(() => {
        const api = async () => {
            const cart = await getCart();
            setCart(cart?.items)

        }
        api()
    }, [])


    const price = useMemo(() => cart?.reduce((acc, num) => acc + num.product.price, 0), [cart])

    const Remove = async (id: string) => {
       try {
             fetch(`/api/cartDelete/${id}`, { method: "DELETE" })

           
           setCart((prevCart: any) => 
               prevCart.filter((item: any) => item.id !== id),
        );
       } catch (error) {
        console.log(error);
        
       }



    }

    
    
    return (
        <div>
            <h1>Cart</h1>
            {cart ? (
                <ul>
                    {cart.map((product: any) => (

                        <li key={product.id}>
                            <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg text-black bg-white">
                                <div className="flex flex-col md:flex-row gap-6">

                                    <div className="w-full md:w-1/2">
                                        <img src={product.product.imageUrl} alt={product.title} className="w-full h-80 object-cover rounded-lg shadow" />
                                    </div>


                                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-800">{product.product.title}</h1>
                                            <p className="text-gray-600 text-sm mt-2">Category: <span className="font-semibold">{product.category}</span></p>
                                            <p className="mt-4 text-lg text-gray-700">{product.product.description}</p>
                                            <p className="mt-4 text-xl font-semibold text-blue-600">₹{product.product.price}</p>
                                            <p className={`mt-2 ${product.product.stock > 0 ? "text-green-600" : "text-red-500"} font-semibold`}>
                                                {product.product.stock > 0 ? `In Stock (${product.product.stock} left)` : "Out of Stock"}
                                            </p>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${product.product.stock > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                                    }`}
                                                disabled={product.product.stock === 0}
                                                onClick={() => product.product.stock > 0 && Remove(product.id)}>
                                                {product.product.stock > 0 ? "Remove to Cart" : "Sold Out"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}

                    total Price:${price}
                </ul>
            ) : (
                <p>Your cart is empty or you are not logged in.</p>
            )}


        </div>
    );
}
