import { MdOutlineCancel } from "react-icons/md";
export default function OrderCard({children, img, onClick}){
    return(
        <div className="order-card">
            <div className="order-cancel"><MdOutlineCancel onClick={onClick}/></div>
            <div className="order-img"><img src={img} alt="Product image" /></div>
            {children}
        </div>
    )
}