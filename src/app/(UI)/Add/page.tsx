"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({formData}), 
            });

            const data = await response.json();
            if (response.ok) {
                alert("Product added successfully!");
                router.push(`/product/${data.product.id}`);
                setFormData({ title: "", description: "", price: "", stock: "", imageUrl: "", category: "" });
            } else {
                alert("Error: " + data.error);
                console.log(data);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Something went wrong!");
        }
    };

    if (typeof window === "undefined") return null; 

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="p-2 border rounded text-black bg-white" required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded text-black bg-white" required></textarea>
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="p-2 border rounded text-black bg-white" required />
                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="p-2 border rounded text-black bg-white" required />
                <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="p-2 border rounded text-black bg-white" required />
                <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded text-black bg-white">
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                </select>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Add Product</button>
            </form>
        </div>
    );
};

export default Page;
