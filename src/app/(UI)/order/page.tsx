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

    console.log(orders);

    return (
        <div>
            <h1>Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order: any) => (
                        <li key={order.id}>
                            Order ID: {order.id} - Status: {order.status}
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