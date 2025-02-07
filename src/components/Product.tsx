
import Link from "next/link";


export const Products = ({ products }: { products: any }) => {




    return (
        <div>
            <h1>Products</h1>

            <ul className=" grid grid-cols-1 sm:grid-cols-3">
                {products.map((product: any) => (
                    <li key={product.id} className="border p-4">
                        <Link href={`/product/${product.id}`} key={product.id} >
                            <div key={product.id}>
                                <h2>{product.title}</h2>
                                <img src={product.imageUrl} />
                                <p>{product.description}</p>
                                <div>
                                    Stock : {
                                        product.stock
                                    }
                                </div>
                                <p>Price: ${product.price.toString()}</p>
                            </div>

                        </Link>
                        <div>
                            <button className={`${product.stock == 0 ? "bg-blue-700" : "bg-blue-500"} p-3 rounded-md `}>Cart</button> <button>Buy</button>
                        </div>
                   </li>
                ))}
            </ul>
        </div>
    );
}