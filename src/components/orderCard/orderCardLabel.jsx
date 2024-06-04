export default function OrderCardLabel({children, label}){
    return(
        <div className="order-label">
            <p className="label-text">{label}</p>
            <p className="order-text">{children}</p>
        </div>
    )
}