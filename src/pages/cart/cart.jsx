import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from 'react-router-dom';
import OrderCard from '../../components/orderCard/index.jsx'
import { useState } from 'react';
import getCart from '../../utils/getCart.js';

export default function Cart(){
    const [userCart, setUserCart] = useState(null)
    const db = new Dexie('StoreItems')
    db.version(1).stores({
        items: "orderId, productId, name,color, size, price, quantity, subtotal, img"
    })
    const dexieItems = useLiveQuery(() => {
        if(localStorage.getItem("myEcommerceToken")){
            getCart({next:setUserCart})
        }
        return db.items.toArray()}, []);
    if (!dexieItems) return null
    let allItems
    if(userCart){
        allItems = userCart
    }
    else{
        allItems = dexieItems
    }

    function remove(id){
        if(userCart){
            const token = localStorage.getItem("myEcommerceToken")
            fetch(`https://ecommerceapi-susm.onrender.com/v1/cart/${id}`,{
                method:"DELETE",
                headers:{"Authorization": `Bearer ${token}`}
              })
            .then(res => {
                if(res.status === 200){
                    setUserCart(prev =>{
                        const cart = prev
                        const index = cart.indexOf(item => item.orderId === id)
                        cart.splice(index, 1)
                        return cart
                    })
                }
            })
        }
        db.items.delete(id)
    }
    let total = 0
    const allOrder = allItems?.map(order =>{
        total += Number(order.subtotal)
        return(
            <OrderCard onClick={()=> remove(order.orderId)} img={order.img} key={order.orderId}>
                <OrderCard.Label label='Product:'>{order.name}</OrderCard.Label>
                <OrderCard.Label label='Color:'>{order.color}</OrderCard.Label>
                <OrderCard.Label label='Size:'>{order.size}</OrderCard.Label>
                <OrderCard.Label label='Price:'>${order.price}</OrderCard.Label>
                <OrderCard.Label label='Quantity:'>{order.quantity}</OrderCard.Label>
                <OrderCard.Label label='Subtotal:'>${order.subtotal}</OrderCard.Label>
            </OrderCard>
        )
    })
    
    return(
        <section className="cart">
            <h2>Cart</h2>
            {allOrder}
            {allOrder.length > 0 ? <div className="checkoutCard">
               <h3 className='checkoutCard-title'>Cart total</h3> 
               <div className="checkoutCard-total">
                <p className="label-text">Total:</p>
                <p className="order-text">${total.toFixed(2)}</p>
               </div>
                <Link to='/checkout' className="cartBtn checkoutCard-btn"><h3>CHECKOUT</h3></Link>
            </div> : <h2>Nothing in cart D:</h2>}
        </section>
    )
}