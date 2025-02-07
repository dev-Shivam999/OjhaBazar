import { getCart } from "@/app/lib/actions/Cart";

export default async function CartPage() {
    const cart = await getCart();

    // console.log(cart);
    
    return (
        <div>
            <h1>Cart</h1>
            {cart ? (
                <ul>
                    {cart.items.map((item: any) => (
                        <li key={item.id}>
                            {item.product.title} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty or you are not logged in.</p>
            )}
        </div>
    );
}
