import classNames from "classnames"
import { Link } from "react-router-dom"

export default function MobileBtn({children, color, url}){
    const btnColor = color === "transparent" ? "bg-transparent" : "bg-solid"
    const btnClass = classNames(btnColor, "mobileBtn")
    return(
        <Link to={url} className={btnClass}>{children}</Link>
    )
}