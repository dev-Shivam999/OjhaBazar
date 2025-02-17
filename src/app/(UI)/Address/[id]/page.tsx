import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Address = {
    id: string;
    street: string;
    city: string;
    state: string;
    zip: string;
};

type AddressListProps = {
    addresses: Address[];
    productId: string;
};

const AddressList: React.FC<AddressListProps> = ({ addresses, productId }) => {
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
    });
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const router = useRouter();

    const onSelect = async (addressId: string) => {
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, address: addressId }),
            });

            const data = await res.json();
            if (res.ok) {
                const options = {
                    key: data.key,
                    amount: data.amount,
                    currency: data.currency,
                    order_id: data.razorpayOrderId,
                    name: "Your Store",
                    description: "Order Payment",
                    handler: async function (response: any) {
                        const verifyRes = await fetch("/api/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                orderId: data.orderId,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                               
                            }),
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            alert("Payment successful!");
                            router.push(`/order/${data.orderId}`);
                        } else {
                            alert("Payment verification failed!");
                        }
                    },
                    prefill: { name: "Customer", email: "customer@example.com", contact: "9999999999" },
                    theme: { color: "#F37254" },
                };

                const razor = new (window as any).Razorpay(options);
                razor.open();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Buy Now Error:", error);
            alert("Something went wrong!");
        }
    };

    const handleAddAddress = () => {
        setShowNewAddressForm(true);
    };

    return (
        <div>
            <h2>Select an Address</h2>
            <ul>
                {addresses.map((adr) => (
                    <li key={adr.id}>
                        <input
                            type="radio"
                            name="address"
                            value={adr.id}
                            checked={selectedAddress === adr.id}
                            onChange={() => setSelectedAddress(adr.id)}
                        />
                        {adr.street}, {adr.city}, {adr.state}, {adr.zip}
                    </li>
                ))}
            </ul>
            <button onClick={() => selectedAddress && onSelect(selectedAddress)}>Buy Now</button>

            <button onClick={handleAddAddress}>Add New Address</button>
            {showNewAddressForm && (
                <form>
                    <input
                        type="text"
                        placeholder="Street"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={newAddress.zip}
                        onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                    />
                    <button type="submit">Save Address</button>
                </form>
            )}
        </div>
    );
};

export default AddressList;
