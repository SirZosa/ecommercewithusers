import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import NotificationCard from "../../components/notificationCard/notification-card"
import Modal from "../../components/modal/modal"
import ConfirmationCard from "../../components/confirmationCard"

export default function LogIn({setToken}){
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [formInput, setFormInput] = useState(null)
    const [searchParams, setSerachParams] = useSearchParams()
    const [wrongCredentiasl, setWrongCredentials] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const registered = searchParams.get('registered')

    const navigate = useNavigate()

    useEffect(()=>{
        setFormInput({
            email:email,
            password:password
        })
    },[email, password])

    function validateForm(e){
        e.preventDefault()
        setWrongCredentials(false)
        setLoading(true)
        fetch('https://ecommerceapi-susm.onrender.com/v1/login', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formInput)
        })
        .then(response => {
            if(response.status === 401){
                setWrongCredentials(true)
                setLoading(false)
                return
            }
            if(response.status === 200){
                () => {
                    setLoading(false)
                    navigate('/')
                }
            }
            return response.json()})
            .then(data => {
                localStorage.setItem("myEcommerceToken", data)
                setToken(data)})
        .catch(error => {
        console.error('Error al enviar la petición:', error);
        })
      }
    return(
        <section className="login">
            <h1 className="singup-header">Log In</h1>
            {registered ? <NotificationCard/> : ''}
            {loading ? <Modal>
                <ConfirmationCard>
                    <p>Due to the free hosting services this process may take a while. Please wait.</p>
                    <div className="loader"></div>
                    <div className="lds-dual-ring"></div>
                </ConfirmationCard>
            </Modal> : null}
            <form onSubmit={validateForm} className="login-form">
                <div className="form-input-structure">
                    <label htmlFor="email">Email address<span className="checkout-required"> *</span></label>
                    <input className="form-input" type='email' onChange={(e)=> setEmail(e.target.value)} required name="email" />
                </div>
                <div className="form-input-structure">
                    <div className="form-conditional">
                        <label htmlFor="password">Password<span className="checkout-required"> *</span></label>
                        {wrongCredentiasl ? <p>Wrong password/email.</p>:''}
                    </div>
                    <input className="form-input" type='password' onChange={(e)=> setPassword(e.target.value)} required name="password" />
                </div>
                <button className=" cartBtn  mobileBtn checkoutCard-btn"><h3>LogIn</h3></button>
            </form>
        </section>
    )
}