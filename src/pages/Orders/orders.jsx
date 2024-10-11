import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuidv4 } from 'uuid'
import getOrders from '../../utils/getOrder';
import { useState } from 'react';
export default function Orders(){
    const [userOrder, setUserOrder] = useState(null)
    const db = new Dexie('StoreItems')
    db.version(1).stores({
        items: "orderId, productId, name,color, size, price, quantity, subtotal, img"
    })
    const dexieItems = useLiveQuery(() => {
        if(localStorage.getItem("myEcommerceToken")){
            getOrders({next:setUserOrder})
        }
        return db.items.toArray()}, []);
    if (!dexieItems) return null
    let allItems
    if(userOrder){
        allItems = {}
        userOrder.forEach((objeto) => {
            const { order_id } = objeto;
            if (!allItems[order_id]) {
              allItems[order_id] = [];
            }
            allItems[order_id].push(objeto);
          })
        allItems = Object.values(allItems)
    }
    else{
        allItems = dexieItems
    }

    function renderOrders(){
        if(allItems[0] && localStorage.getItem("myEcommerceToken")){
            return allItems?.map(order =>{
                let total = 0
                    const orderItem = order.map(item=>{
                        total += Number(item.total)
                        return (
                            <div className="order-item-details">
                                <div className="order-summary">
                                    <p className='order-page-label'>Name:</p>
                                    <p className="order-page-value">{item.name}</p>
                                </div>
                                <div className="order-summary">
                                    <p className='order-page-label'>Quantity:</p>
                                    <p className="order-page-value">{item.quantity}</p>
                                </div>
                                <div className="order-summary">
                                    <p className='order-page-label'>Subtotal:</p>
                                    <p className="order-page-value">${item.total}</p>
                                </div>
                            </div>
                        )
                    })
                    return(
                        <div className="total-order" key={uuidv4()}>
                            <details>
                                <summary>
                                    <div className="order-summary">
                                    <p className='order-page-label'>Order number:</p>
                                    <p className="order-page-value">{order[0].order_id}</p>
                                    </div>
                                    <div className="order-summary">
                                    <p className='order-page-label'>Order creation date:</p>
                                    <p className="order-page-value">{order[0].created_at.split("T")[0]}</p>
                                    </div>
                                    <div className="order-summary">
                                    <p className='order-page-label'>Total:</p>
                                    <p className="order-page-value">${total.toFixed(2)}</p>
                                    </div>
                                </summary>
                                {orderItem}
                            </details>
                        </div>
                    )
                })
            
        }
        else return(
            <h4>No orders.</h4>
        )
    } 
       

    function renderNoToken(){
            let total = 0
            for(let item of allItems){
                total += Number(item.subtotal)
            }
            if(total === 0){
                return(
                    <h4>No orders.</h4>
                )
            }
            else {
                return(
                    <>
                <div className="order-page-details">
                <div className="order-page-id">
                    <p className='order-page-label'>Order number:</p>
                    <p className="order-page-value">{uuidv4().slice(0,8)}</p>
                </div>
                <div className="order-page-date">
                    <p className='order-page-label'>Date:</p>
                    <p className="order-page-value">{new Date().toDateString()}</p>
                </div>
            </div>
            <div className="order-page-total">
                <p className='order-page-label'>Total:</p>
                <p className="order-page-value">${total.toFixed(2)}</p>
            </div>
            </>
                )

            }

    }
    
    
    
    return(
        <section className="orders">
            <h2>Orders</h2>
            {localStorage.getItem("myEcommerceToken") ? renderOrders() : renderNoToken()}
        </section>
    )
}