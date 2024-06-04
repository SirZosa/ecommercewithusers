import ListLinks from '../../components/listLinks/index.jsx'
import { PiDevToLogoFill } from "react-icons/pi";

export default function Links(){
    return(
        <section className="Links">
            <PiDevToLogoFill className="Links-icon"/>
            <h3 className="Links-title">The best look anytime, anywhere.</h3>
            <div className="gender-links">
            <ListLinks>
                <ListLinks.title>For Her</ListLinks.title>
                <ListLinks.link href="#">Women Jeans</ListLinks.link>
                <ListLinks.link href="#">Tops and Shirts</ListLinks.link>
                <ListLinks.link href="#">Women Jackets</ListLinks.link>
                <ListLinks.link href="#">Heels and Flats</ListLinks.link>
                <ListLinks.link href="#">Women Accessories</ListLinks.link>
            </ListLinks>
            <ListLinks>
                <ListLinks.title>For Her</ListLinks.title>
                <ListLinks.link href="#">Men Jeans</ListLinks.link>
                <ListLinks.link href="#">Men Shirts</ListLinks.link>
                <ListLinks.link href="#">Men Jackets</ListLinks.link>
                <ListLinks.link href="#">Men Shoes</ListLinks.link>
                <ListLinks.link href="#">Men Accessories</ListLinks.link>
            </ListLinks>
            </div>
            <h3 className="subscribe">Subscribe</h3>
            <input className="subscribe-input" placeholder='Your email address...' type='email'/>
        </section>
    )
}