import CartItem from "./CartItem";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider";

const ShoppingCart = () => {
    let { cart } = useContext(GlobalContext);
    const history = useHistory();

    const orderNowButtonClicked = () => {
        history.push("/orderDetails");
    }

    return (
        <div>
            <div className="cart-container">
                {cart.map(p => (
                    <CartItem key={p.id} product={p} />
                ))}
            </div>
            <button className={cart.length==0 ? "hidden" : "visible"} onClick={orderNowButtonClicked}>Order now</button>
        </div>
    )
}

export default ShoppingCart;