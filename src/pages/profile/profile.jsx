import { useState, useEffect } from "react";
import getUserInfo from "../../utils/getUserInfo";
import OrderCard from "../../components/orderCard";
import { Link } from "react-router-dom";
export default function Profile(){
    const [user, setUser] = useState(null)
    useEffect(()=>{
        getUserInfo({next:setUser})
    },[])

    function renderProfile(){
        if(user){
            return(
                <section className="profile">
                    <h1 style={{textAlign:'center'}}>User Information</h1>
                    <div className="user-info">
                        <OrderCard.Label label='Name:'>{user.name}</OrderCard.Label>
                        <OrderCard.Label label='Last name:'>{user.lastname}</OrderCard.Label>
                        <OrderCard.Label label='Country:'>{user.country}</OrderCard.Label>
                        <OrderCard.Label label='State:'>{user.state}</OrderCard.Label>
                        <OrderCard.Label label='City:'>{user.city}</OrderCard.Label>
                        <OrderCard.Label label='Zipcode:'>{user.zipcode}</OrderCard.Label>
                        <OrderCard.Label label='Address:'>{user.street}</OrderCard.Label>
                        {user.apartment?<OrderCard.Label label='Apartment:'>{user.apartment}</OrderCard.Label>: null}
                        <OrderCard.Label label='Phone:'>{user.phone}</OrderCard.Label>
                        <OrderCard.Label label='Email:'>{user.email}</OrderCard.Label>
                    <Link to={'edit'} className=" cartBtn  mobileBtn checkoutCard-btn"><h3>Edit</h3></Link>
                    </div>
            </section>
            )
        }
        else{
            <h1>session ended</h1>
        }
    }
    return(
        renderProfile()
    )
}