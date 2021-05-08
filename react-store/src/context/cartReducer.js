const cartReducer = (state, action) => {
    let cart = state;
    let products = [
        {id: 1, name: "par of shoes 1", category: "shoes", price: 100, imageUrl: "https://cdn.britannica.com/04/123704-050-023DC490/Pair-leather-shoes.jpg"},
        {id: 2, name: "par of shoes 2", category: "shoes", price: 200, imageUrl: "https://www.rei.com/media/5bbcbee2-1b95-4b9a-9347-065a3937152c?size=784x588"},
        {id: 3, name: "hat 1", category: "hats", price: 300, imageUrl: "https://assets.adidas.com/images/w_600,f_auto,q_auto/7aac39a2a0eb4cb4915ba887014c43b8_9366/Superlite_Hat_Black_CJ0445_01_standard.jpg"},
        {id: 4, name: "hat 2", category: "hats", price: 400, imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/dfad6b12-71f9-4709-9851-7999516e11f1/legacy91-golf-hat-MRRW3Q.jpg"},
        {id: 5, name: "backpack 1", category: "backpacks", price: 500, imageUrl: "https://www.helikon-tex.com/media/catalog/product/cache/4/image/500x/17f82f742ffe127f42dca9de82fb58b1/p/l/pl-dtn-nl-1919.jpg"},
        {id: 6, name: "backpack 2", category: "backpacks", price: 600, imageUrl: "https://www.worten.pt/i/1364b3fc7d902892717af9c8642fa4965471f4fd.jpg"},
        {id: 7, name: "coat 1", category: "coats", price: 700, imageUrl: "https://racepro.pt/media/multimedia/ImagensMobile/ARTIGOS/apico-coat-bu.jpg"},
        {id: 8, name: "coat 2", category: "coats", price: 800, imageUrl: "https://cdn.luxe.digital/media/2020/10/01123242/best-winter-coats-men-budget-amazon-essentials-puffer-review-luxe-digital.jpg"}
    ];
    switch(action.type){
        case "addToCart": {
            let {id, quantity} = action.payload;
            let inCart = false, newCart = [];
            cart.forEach(p => {if(p.id == id) inCart=true;});
            
            if(inCart) newCart = cart.map(p => (p.id == id) ? {...p, quantity: quantity+p.quantity} : {...p});
            else newCart = cart.concat({...products.find(p => p.id == id),quantity:quantity});
            
            fetch("http://localhost:3001/api/shoppingCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCart)
            });
            
            return newCart;
        }
        case "removeFromCart": {
            let {id, quantity} = action.payload;
            let newCart = cart.map(p => (p.id == id) ? {...p, quantity: p.quantity-quantity} : {...p});
            newCart = newCart.filter(p => p.quantity > 0);
            
            fetch("http://localhost:3001/api/shoppingCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCart)
            });

            return newCart;
        }
        case "finishOrder": {
            let orderDetails = action.payload;
            let totalCost = 0;
            orderDetails.purchasedItems = cart;
            cart.forEach(item => totalCost += item.price * item.quantity);
            orderDetails.totalCost = totalCost;
                
            fetch("http://localhost:3001/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderDetails)
            });
            
            fetch("http://localhost:3001/api/shoppingCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            });
            
            return []; 
        }
    }
}

export default cartReducer;