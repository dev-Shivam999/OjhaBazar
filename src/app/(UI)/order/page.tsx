"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Page = () => {
    const { data: session } = useSession();
    const [orders, setOrders] = useState([]);


    const api=async()=>{
       try {
           const data = await fetch('/api/orders')
           const result = await data.json()
           console.log(result);
           
           setOrders(result)
       } catch (error) {
        console.log(error);
        
       }
        
           
    }
    useEffect(() => {
        //@ts-ignore
        if (session?.user?.id) {
           api()
        }
    }, []);


    return (
        <div>
            <h1>Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    { orders.map((addr:any) => (
                        <li key={addr.address.id} className="border p-3 my-2 rounded-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p><strong>{addr.address.fullName}</strong></p>
                                    <p>{addr.address.street}, {addr.address.city}, {addr.address.state}, {addr.address.zipCode}</p>
                                    <p>{addr.address.country} | {addr.address.phone}</p>
                                </div>
                               
                            </div>
                          {
                                addr.orderItems.map((product:any) => <div key={product.id} className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg text-black bg-white">
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
                                                <p>
                                                    Status :{
                                                        addr.status
                                                    }
                                                </p>
                                            </div>

                                          
                                        </div>
                                    </div>
                                </div>)
                          }
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default Page;