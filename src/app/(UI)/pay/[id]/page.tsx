"use client";
import { useParams } from 'next/navigation';
import React, { useRef } from 'react';

const Page = () => {
    const cardRef = useRef<HTMLInputElement>(null); // Add type for useRef
    const { id }: { id: string } = useParams(); // Extract id from useParams

    const pay = async (id: string) => {
        const cardNumber = cardRef.current?.value;

        // Validate card number length
        if (!cardNumber || cardNumber.length !== 10) {
            alert("Please enter a valid 10-digit card number.");
            return;
        }

        try {
            const response = await fetch(`/api/payment/${id}`, {
                method: 'POST', // Use POST for payment
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cardNumber }), // Send card number in the request body
            });

            if (!response.ok) {
                throw new Error(`Payment failed: ${response.statusText}`);
            }

            const result = await response.json(); // Await the JSON parsing
            console.log(result);

            alert("Payment successful!");
        } catch (error) {
            console.error(error);
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center pt-10">
            <input
                type="text"
                ref={cardRef}
                maxLength={10} // Use maxLength for text input
                placeholder="Enter the Card Number"
                className="border text-black p-2 w-1/2"
            />
            <button
                className="bg-blue-700 text-white p-3 rounded"
                onClick={() => pay(id)}
            >
                Pay Now
            </button>
        </div>
    );
};

export default Page;