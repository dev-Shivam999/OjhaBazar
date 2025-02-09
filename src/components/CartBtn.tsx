import { useSession } from 'next-auth/react';
import React from 'react';

const CartBtn: React.FC<{ ProductId: string, ProductSock: Number }> = ({ ProductId, ProductSock }) => {
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
        <button
            onClick={() => AddToCart(ProductId)}
            className={`p-3 rounded-md ${ProductSock === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={ProductSock === 0}
        >
            Add to Cart
        </button>
    );
};

export default CartBtn;