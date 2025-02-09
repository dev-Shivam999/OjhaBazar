"use client"; // Ensures this runs only on the client

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Address = {
    id: string;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
};

export default function AddressList() {
    const router=useRouter()
    const {id}=useParams()
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [newAddress, setNewAddress] = useState<Address>({
        id: "",
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
    });
    const onSelect=async(adr:string)=>{
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id, address: adr }),
            });

            const data = await res.json();
            if (res.ok) {
                router.push(`/pay/${data.orderId}`)    
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Buy Now Error:", error);
            alert("Something went wrong!");
        }
    }

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await fetch("/api/address");
                const data = await res.json();
                setAddresses(data);
                
            } catch (error) {
                console.error("Error fetching addresses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAddresses();
    }, []);

    const handleAddAddress = async () => {
        if (!newAddress.fullName) return alert("Please enter all details!");
        setLoading(true);

        try {
            const res = await fetch("/api/address", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAddress),
            });

            const data = await res.json();
            if (res.ok) {
                setAddresses([...addresses,data]);
                setNewAddress({
                    id: "",
                    fullName: "",
                    phone: "",
                    street: "",
                    city: "",
                    state: "",
                    country: "",
                    zipCode: "",
                });
            }
        } catch (error) {
            console.error("Error adding address:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Select Address</h2>

            {loading ? (
                <p>Loading addresses...</p>
            ) : (
                <ul>
                    {addresses.length>0&&addresses.map((addr) => (
                        <li key={addr.id} className="border p-3 my-2 rounded-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p><strong>{addr.fullName}</strong></p>
                                    <p>{addr.street}, {addr.city}, {addr.state}, {addr.zipCode}</p>
                                    <p>{addr.country} | {addr.phone}</p>
                                </div>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded"
                                    onClick={() => onSelect(addr.id)}
                                >
                                    Select
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <h2 className="text-lg font-semibold mt-4">Add New Address</h2>
            <input type="text" placeholder="Full Name" className="border text-black p-2 w-full"
                value={newAddress.fullName}
                onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
            />
            <input type="text" placeholder="Street" className="border text-black p-2 w-full"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            />
            <input type="text" placeholder="City" className="border text-black p-2 w-full"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <input type="text" placeholder="State" className="border text-black p-2 w-full"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            />
            <input type="text" placeholder="Country" className="border text-black p-2 w-full"
                value={newAddress.country}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            />
            <input type="text" placeholder="Zip Code" className="border text-black p-2 w-full"
                value={newAddress.zipCode}
                onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
            />
            <input type="text" placeholder="Phone Number" className="border text-black p-2 w-full"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            />

            <button
                className="bg-green-500 text-white p-2 mt-2 w-full"
                disabled={loading}
                onClick={handleAddAddress}
            >
                {loading ? "Saving..." : "Add Address"}
            </button>
        </div>
    );
}
