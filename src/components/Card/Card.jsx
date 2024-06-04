import classNames from "classnames"
export default function Card({children, pic, className}){
    const classes = classNames('Card', className)
    return(
        <div className={classes}>
            <div className="card-background" style={{backgroundImage:`url(${pic})`}}></div>
            <div className="Card-inside">
                {children}
            </div>
        </div>
    )
}

