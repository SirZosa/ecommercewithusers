
export default function ItemInfo({title, gender, price, rate}){
    return(
        <div className="itemInfo">
            <h4 className="itemName">{title}</h4>
            <p className="itemGender">{gender}</p>
            <p className="itemPrice">${price}</p>
            <p className="itemRate">{rate}</p>
        </div>
    )
}