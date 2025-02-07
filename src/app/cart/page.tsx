import { getCart } from "@/app/lib/actions/Cart";

export default async function CartPage() {
    const cart = await getCart();

    const price = cart?.items.reduce((acc, num) => acc + num.product.price, 0)
    return (
        <div>
            <h1>Cart</h1>
            {cart ? (
                <ul>
                    {cart.items.map((item: any) => (
                        <li key={item.id}>
                            <img src={item.product.imageUrl} alt="" />
                            {item.product.title} - Quantity: {item.quantity}
                            <div>Price : ${item.product.price}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty or you are not logged in.</p>
            )}


            total Price:{price
            }
        </div>
    );
}
