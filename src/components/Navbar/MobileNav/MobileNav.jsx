import { useState } from "react";
import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import { Link, useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { PiDevToLogoFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import getCart from "../../../utils/getCart.js"


export default function MobileNav({token}){
    const [open, setOpen] = useState(false);
    const path = useLocation()
    const navigate = useNavigate()
    const [userCart, setUserCart] = useState(null)
    const db = new Dexie('StoreItems')
    db.version(1).stores({
        items: "orderId, productId, name,color, size, price, quantity, subtotal, img"
    })
    const dexieItems = useLiveQuery(() => {
        window.scrollTo(0, 0)
        if(localStorage.getItem("myEcommerceToken")){
            getCart({next:setUserCart})
        }
        return db.items.toArray()}, [path]);
    if (!dexieItems) return null
    let allItems
    if(userCart){
        allItems = userCart
    }
    else{
        allItems = dexieItems
    }
    
    function OpenNav(){
        setOpen(!open);
    }

    function logOut(){
        localStorage.removeItem("myEcommerceToken")
        navigate(0)
    }
    

    const navOpen = open ? classNames("MobileNav_Open", "Open") : classNames("MobileNav_Open", "Close")
    
    return(
        <nav className="MobileNav">
            <div className="MobileNav_Container">
                <div className="logo">
                    <Link to="/">
                    <PiDevToLogoFill/>
                    </Link>
                </div>
                <div className="MobileNavContainer_End">
                    <div className="nav-cart">
                        <Link to='/cart'>
                        <FaShoppingCart/>
                        </Link>
                        <div className={allItems ? 'nav-cart-quantity-red': 'nav-cart-quantity'}>
                            <span>{allItems? allItems.length: 0}</span>
                        </div>
                    </div>
                    <div className="burgerMenu">
                        <button onClick={()=> OpenNav()}><GiHamburgerMenu/></button>
                    </div>
                </div>
            </div>
            <div className={navOpen}>
                <div className="closeBtn">
                <button onClick={()=> OpenNav()}><IoClose/></button>
                </div>
                <div className="MobileNav_User">
                    {token ? <><Link onClick={()=> OpenNav()} to="/profile">Profile</Link>/<Link onClick={()=>logOut()}>LogOut</Link></>:<><Link onClick={()=> OpenNav()} to="/login">Log In</Link>/<Link onClick={()=> OpenNav()} to='/signup'>Sign up</Link></>}
                    <FaUser/>
                </div>
                <div className="MobileNav_ShopLinks">
                    <Link onClick={()=> OpenNav()} to="category/everything">Everything</Link>
                    <Link onClick={()=> OpenNav()} to="category/women">Women</Link>
                    <Link onClick={()=> OpenNav()} to="category/men">Men</Link>
                    <Link onClick={()=> OpenNav()} to="category/jewelery">Accessories</Link>
                </div>
                <div className="MobileNav_InfoLinks">
                    <Link onClick={()=> OpenNav()} to="#">About</Link>
                    <Link onClick={()=> OpenNav()} to="#">Contact</Link>
                </div>
            </div>
        </nav>
    )
}