import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import getCart from "../../utils/getCart"
import Select from 'react-select'
export default function Checkout(){
    const [countries, setCountries] = useState(null)
    const [states, setStates] = useState(null)

    const [fisrtName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [street, setStreet] = useState(null)
    const [apartmen, setApartment] = useState(null)
    const [city, setCity] = useState(null)
    const [zipcode, setZipcode] = useState(null)
    const [Phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [inputCountry, setInputCountry] = useState('United States')
    const [stateInput, setStateInput] = useState(null)
    const [userCart, setUserCart] = useState(null)
    const [groups, setGroups] = useState(null)
    const [formInput, setFormInput] = useState({
        fisrtName:null,
        lastName:null,
        country:null,
        street:null,
        city:null,
        zipcode:null,
        phone:null,
        email:null
    })

    useEffect(()=>{
        if(localStorage.getItem("myEcommerceToken")){
            getCart({next:setUserCart})
        }
        fetch(`https://countriesnow.space/api/v0.1/countries/`)
        .then(res=>res.json())
        .then(data=> setCountries(data.data.map(obj => {return obj})))
    },[])

    useEffect(()=>{
        const country = inputCountry
        fetch(`https://countriesnow.space/api/v0.1/countries/states/q?country=${country}`)
        .then(response => response.json())
        .then(result => setStates((result.data.states)))
        .catch(error => console.log('error', error));
        setStateInput(null)
            },[inputCountry])

    useEffect(()=>{
        setFormInput({
            fisrtName:fisrtName,
            lastName:lastName,
            country:inputCountry,
            street:street,
            apartmen:apartmen,
            state:stateInput?.value,
            city, 
            zipcode:Number(zipcode),
            phone:Phone,
            email:email
        })
    },[fisrtName, lastName, inputCountry, street, stateInput, zipcode, Phone, email])

    async function placeOrder(e){
        e.preventDefault()
        if(localStorage.getItem("myEcommerceToken")){
            const allItems = userCart
            const token = localStorage.getItem("myEcommerceToken")
            try{
                if(token){
                    await fetch(`https://ecommerceapi-susm.onrender.com/v1/orders`,{
                        method:"POST",
                        headers:{
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"},
                        body:JSON.stringify(allItems)
                      })
                navigate('/orders')
                }
            }
            catch(e){
                return alert('Error: Please, try again')
            }
        }
        else{
            navigate('/orders')
        }
    }

    const countryOptions = countries?.map(obj => {
        return {value: obj.country, label:obj.country}
    })

    const stateOption = states?.map(obj =>{
        const {name} = obj
        return {value:name, label:name}
    })
    
    
    const navigate = useNavigate()

    return(
        <section className="checkout">
            <h2>Checkout</h2>
            <p className="warning">This e-commerce website was made for learnig and practice purposes, any of the information entered below is not going to be stored in any part outside your web browser, you can use fake information if you want to.</p>
            <h4 className="billing-title">Billing Details</h4>
            <form onSubmit={placeOrder} className="checkout-form">
                <div className="form-name">
                    <div className="form-input-structure">
                        <label htmlFor="first name">First name<span className="checkout-required"> *</span></label>
                        <input className='form-input' onChange={(e)=> setFirstName(e.target.value)} name="first name" required id="first name" />
                    </div>
                    <div className="form-input-structure">
                        <label htmlFor="last name">Last name<span className="checkout-required"> *</span></label>
                        <input className="form-input" type="text" onChange={(e)=> setLastName(e.target.value)} name="last name" required id="last name"/>
                    </div>
                </div>
                <div className="form-input-structure">
                    <label htmlFor="country">Country / Region<span className="checkout-required"> *</span></label>
                    <Select name="country" options={countries ? countryOptions : "loading..."} onChange={(e) => setInputCountry(e.value)} required/>
                </div>
                <div className="checkout-street-address">
                    <div className="form-input-structure">
                        <label htmlFor="Street-address">Street address<span className="checkout-required"> *</span></label>
                        <input className="form-input" type="text" onChange={(e)=> setStreet(e.target.value)} name="street-address" required id="street-address"/>
                    </div>
                    <div className="form-input-structure">
                        <input className="form-input" type="text" placeholder="Apartment, suite, unit, etc. (optional)" required onChange={(e)=> setApartment(e.target.value)} name="Apartment" id="Apartment"/>
                    </div>
                </div>
                <div className="form-input-structure">
                    <label htmlFor="state">State<span className="checkout-required"> *</span></label>
                    <Select name="state" options={states ? stateOption : "loading..."} value={stateInput} required onChange={(e) => setStateInput({value:e.value, label:e.value})}/>
                </div>
                <div className="form-input-structure">                        
                    <label htmlFor="city">City<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='text'  onChange={(e)=> setCity(e.target.value)} required name="city" />
                </div>
                <div className="form-input-structure">
                    <label htmlFor="zipcode">Zipcode<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='number' onChange={(e)=> setZipcode(e.target.value)} required name="zipcode" />
                </div>
                <div className="form-input-structure">                        
                    <label htmlFor="Phone">Phone<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='tel'  required onChange={(e)=> setPhone(e.target.value)}name="Phone" />
                </div>
                <div className="form-input-structure">
                    <label htmlFor="email">Email address<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='email' onChange={(e)=> setEmail(e.target.value)} required name="email" />
                </div>
                <button className=" cartBtn  mobileBtn checkoutCard-btn"><h3>PLACE ORDER</h3></button>
            </form>
        </section>

    )
}