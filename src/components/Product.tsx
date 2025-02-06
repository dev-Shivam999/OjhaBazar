



export const Products = ({ products }: { products: any }) => {
    
    console.log(products[0].category);
        
    
    return (
        <div>
            <h1>Products</h1>

            <ul className=" grid grid-cols-1 sm:grid-cols-3">
                {products.map((product: any) => (
                    <li>
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
                        <div>
                            <button className={`${product.stock == 0 ? "bg-blue-700" : "bg-blue-500"}`}>Cart</button> <button>Buy</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}