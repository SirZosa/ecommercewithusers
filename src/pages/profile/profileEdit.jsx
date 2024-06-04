import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utils/getUserInfo";

export default function ProfileEdit(){
    const [user, setUser] = useState(null)
    const [formInput, setFormInput] = useState({})
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [passwordMatch, setPasswordMatch] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        getUserInfo({next:setUser})
    },[])

    function enterInfoToForm({label, data}){
        setFormInput(prev=>{
            const form = {
                ...prev,
                [label]:data
            }
            if(!data){
                delete form[`${label}`]
            }
            return form
        })
    }

    function managePassword({label, data}){
        setPassword(data)
        enterInfoToForm({label,data})
    }

    function updateUser(e){
        e.preventDefault()
        const token = localStorage.getItem("myEcommerceToken")
        if(confirmPassword !== password){
            setPasswordMatch(false)
            return
        }
        if(confirmPassword === password){
            setPasswordMatch(true)
        }
        async function fetchData(){
            try{
              const response = await fetch('http://localhost:1234/v1/profile',{
                method:"PATCH",
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formInput)
              })
              if(response.status === 200){
                navigate("/profile")
              }
              if(response.status === 400){
                localStorage.removeItem("myEcommerceToken")
                return console.log("Changes could not be saved, try again.")
              }
            }
            catch(e){
              console.log(e)
            }
          }
          fetchData()
      }

    function profileSection(){
        if(user){
            return(
                <section className="signup">
            <h1 className="singup-header">Edit profile</h1>
            <h3>Change only what you want to change.</h3>
            <form onSubmit={updateUser} className="signin-form">
                <div className="form-name">
                    <div className="form-input-structure">
                        <label htmlFor="first name">First name</label>
                        <input className='form-input' placeholder={user.name} onChange={(e)=> enterInfoToForm({label:'name',data:e.target.value})} name="first name" id="first name"/>
                    </div>
                    <div className="form-input-structure">
                        <label htmlFor="last name">Last name</label>
                        <input className="form-input" type="text" placeholder={user.lastname} onChange={(e)=> enterInfoToForm({label:'lastname',data:e.target.value})} name="last name" id="last name"/>
                    </div>
                </div>
                <div className="form-input-structure">
                    <label htmlFor="country">Country / Region</label>
                    <input className="form-input"  type="text" placeholder={user.country} onChange={(e)=> enterInfoToForm({label:'country',data:e.target.value})} name="country" id="country"/>
                </div>
                <div className="form-input-structure">
                    <label htmlFor="state">State</label>
                    <input className="form-input" type="text" placeholder={user.state} onChange={(e)=> enterInfoToForm({label:'state',data:e.target.value})} name="state" id="state"/>
                </div>
                <div className="form-input-structure">                        
                    <label htmlFor="city">City</label>
                    <input className="form-input" type='text'  placeholder={user.city} onChange={(e)=> enterInfoToForm({label:'city',data:e.target.value})} name="city"/>
                </div>
                <div className="form-input-structure">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input className="form-input"  type='number' placeholder={user.zipcode} onChange={(e)=> enterInfoToForm({label:'zipcode',data:Number(e.target.value)})} name="zipcode" />
                </div>
                <div className="checkout-street-address">
                    <div className="form-input-structure">
                        <label htmlFor="Street-address">Street address</label>
                        <input className="form-input" type="text" placeholder={user.street} onChange={(e)=> enterInfoToForm({label:'street',data:e.target.value})} name="street-address" id="street-address"/>
                    </div>
                    <div className="form-input-structure">
                        <input className="form-input" type="text" placeholder={user.apartmen ? user.apartmen : "Apartment, suite, unit, etc. (optional)"} onChange={(e)=> enterInfoToForm({label:'apartment',data:e.target.value})} name="Apartment" id="Apartment"/>
                    </div>
                </div>
                <div className="form-input-structure">                        
                    <label htmlFor="Phone">Phone</label>
                    <input className="form-input" type='tel' placeholder={user.phone} onChange={(e)=> enterInfoToForm({label:'phone',data:e.target.value})} name="Phone" />
                </div>
                <div className="form-input-structure">
                    <div className="form-conditional">
                    <label htmlFor="email">Email address</label>
                    </div>
                    <input className="form-input" type='email' placeholder={user.email} onChange={(e)=> enterInfoToForm({label:'email',data:e.target.value})} name="email" />
                </div>
                <div className="form-input-structure">
                    <div className="form-conditional">
                        <label htmlFor="password">New password</label>
                        {password?.length < 5 ? <p>5 characters minimum.</p>:''}
                    </div>
                    <input className="form-input" type='password' onChange={(e)=> managePassword({label:'password',data:e.target.value})} name="password" />
                </div>
                <div className="form-input-structure">
                <div className='form-conditional'>
                        <label htmlFor="confirm-password">Confirm Password<span className="checkout-required"> *</span></label>
                        {passwordMatch === false ? <p>Passwords don't match</p>:''}
                    </div>
                    <input className="form-input" type='password'  name="confirm-password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <button className=" cartBtn  mobileBtn checkoutCard-btn"><h3>Save Changes</h3></button>
            </form>
        </section>
            )
        }
        else{
            return(
                <h1>Sesion ended</h1>
            )
        }
        
    }

    return(
        <section className="profile">
            {profileSection()}
        </section>
    )
}