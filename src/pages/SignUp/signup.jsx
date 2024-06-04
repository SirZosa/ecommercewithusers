import Select from 'react-select'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

export default function SignUp(){
    const [countries, setCountries] = useState(null)
    const [states, setStates] = useState(null)

    const [fisrtName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [street, setStreet] = useState(null)
    const [apartmen, setApartment] = useState("")
    const [city, setCity] = useState(null)
    const [zipcode, setZipcode] = useState(null)
    const [Phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassowrd, setConfirmPassword] = useState(null)
    const [passwordMatch, setPasswordMatch] = useState(null)
    const [inputCountry, setInputCountry] = useState('United States')
    const [stateInput, setStateInput] = useState(null)
    const [emailInUse, setEmailInUse] = useState(null)
    const [apiResponse, setApiResponse] = useState(null)
    const [formInput, setFormInput] = useState({
        name:null,
        lastname:null,
        country:null,
        state:null,
        city:null,
        zipcode:null,
        street:null,
        apartmen:"",
        phone:null,
        email:null,
        password:null
    })

    const navigate = useNavigate()
    
    useEffect(()=>{
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
            name:fisrtName,
            lastname:lastName,
            country:inputCountry,
            street:street,
            apartment:apartmen,
            state:stateInput?.value,
            city, 
            zipcode:Number(zipcode),
            phone:Phone,
            email:email,
            password:password
        })
    },[fisrtName, lastName, inputCountry, street, stateInput, zipcode, Phone, email, password, apartmen])

    const countryOptions = countries?.map(obj => {
        return {value: obj.country, label:obj.country}
    })

    const stateOption = states?.map(obj =>{
        const {name} = obj
        return {value:name, label:name}
    })
    
    function validateForm(e){
        e.preventDefault()
        setEmailInUse(false)
        if(confirmPassowrd !== password){
            setPasswordMatch(false)
            return
        }
        if(confirmPassowrd === password){
            setPasswordMatch(true)
        }
        fetch('http://localhost:1234/v1/register', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formInput)
        })
        .then(response => {
            if(response.status === 409){
                setEmailInUse(true)
            }
            if(response.status === 201){
                navigate('/login?registered=true')
            }
            return response.json()})
        .catch(error => {
        console.error('Error al enviar la petición:', error);
        })
      }
    return(
        <section className="signup">
            <h1 className="singup-header">Sign Up</h1>
            <form onSubmit={validateForm} className="signin-form">
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
                <div className="form-input-structure">
                    <label htmlFor="state">State<span className="checkout-required"> *</span></label>
                    <Select name="state" options={states ? stateOption : "loading..."} value={stateInput} required onChange={(e) => setStateInput({value:e.value, label:e.value})}/>
                </div>
                <div className="form-input-structure">                        
                    <label htmlFor="city">City<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='text'  onChange={(e)=> setCity(e.target.value)} required name="city"/>
                </div>
                <div className="form-input-structure">
                    <label htmlFor="zipcode">Zipcode<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='number' onChange={(e)=> setZipcode(e.target.value)} required name="zipcode" />
                </div>
                <div className="checkout-street-address">
                    <div className="form-input-structure">
                        <label htmlFor="Street-address">Street address<span className="checkout-required"> *</span></label>
                        <input className="form-input" type="text" onChange={(e)=> setStreet(e.target.value)} name="street-address" required id="street-address"/>
                    </div>
                    <div className="form-input-structure">
                        <input className="form-input" type="text" placeholder="Apartment, suite, unit, etc. (optional)" onChange={(e)=> setApartment(e.target.value)} name="Apartment" id="Apartment"/>
                    </div>
                </div>
                <div className="form-input-structure">                        
                    <label htmlFor="Phone">Phone<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='tel'  required onChange={(e)=> setPhone(e.target.value)}name="Phone" />
                </div>
                <div className="form-input-structure">
                    <div className="form-conditional">
                    <label htmlFor="email">Email address<span className="checkout-required"> *</span></label>
                    {emailInUse === true ? <p>Email already in use.</p> : ''}
                    </div>
                    <input className="form-input" type='email' onChange={(e)=> setEmail(e.target.value)} required name="email" />
                </div>
                <div className="form-input-structure">
                    <div className="form-conditional">
                        <label htmlFor="password">Password<span className="checkout-required"> *</span></label>
                        {password?.length < 5 ? <p>5 characters minimum.</p>:''}
                    </div>
                    <input className="form-input" type='password' onChange={(e)=> setPassword(e.target.value)} required name="password" />
                </div>
                <div className="form-input-structure">
                    <div className='form-conditional'>
                        <label htmlFor="confirm-password">Confirm Password<span className="checkout-required"> *</span></label>
                        {passwordMatch === false ? <p>Passwords don't match</p>:''}
                    </div>
                    <input className="form-input" type='password' onChange={(e)=> setConfirmPassword(e.target.value)} required name="confirm-password" />
                </div>
                <button className=" cartBtn  mobileBtn checkoutCard-btn"><h3>Sign Up</h3></button>
            </form>
        </section>
    )
}