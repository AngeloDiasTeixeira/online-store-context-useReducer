import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider";

const ProductDetail = () => {
    let {products,cart,dispatch} = useContext(GlobalContext);
    const [quantity, setQuantity] = useState(0);
    console.log("PRODUCTDETAIL: ", cart);

    let { productId:id } = useParams();
    let product = products.find(p => p.id == id);
    let quantityInCart = cart.find(p => p.id == id)?.quantity;

    const addToCartButtonClicked = () => {
        dispatch(
            {
                type: "addToCart", 
                payload:{id: id, quantity: quantity}
            }
        );
        setQuantity(0);
    }

    const removeFromCartButtonClicked = () => {
        dispatch(
            {
                type: "removeFromCart",
                payload:{id: id, quantity: quantity}
            }
        );
        setQuantity(0);
    }

    return (
        <div className="product-detail-container-container">
            <div className="product-detail-container">
                <div className="image-container">
                    <img src={product.imageUrl} alt="" />
                </div>
                <span>Name: {product.name}</span>
                <span>Category: {product.category}</span>
                <span>Price: {product.price}</span>
                <span>Quantity already in cart: {quantityInCart || 0}</span>
                <form>
                   <input type="number" value={quantity} onChange={ e => setQuantity(+e.target.value)} />
                </form>
                <div className="buttons">
                    <button disabled={!quantity} onClick={addToCartButtonClicked}>Add to cart</button>
                    <button disabled={!quantityInCart || !quantity} onClick={removeFromCartButtonClicked}>Remove from cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;