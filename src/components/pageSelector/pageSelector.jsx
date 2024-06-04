import React from "react"
import {NavLink, useSearchParams} from 'react-router-dom'

export default function PageSelector({ItemCount}){
    const pagesNum = Math.ceil((ItemCount / 6))
    const [searchParams, setSearchParams] = useSearchParams()
    const filterValue = searchParams.get("sort")
    const pageSelectors = (pages) =>{
        let selector = []
        for(let i=0; i<pages; i++){
            selector.push(<NavLink key={i} className={({isActive})=>
        isActive ? 'active-page' : ''} to={filterValue ? `page/${i+1}?sort=${filterValue}` : `page/${i+1}`}>{i+1}</NavLink>)
        }
        return selector
    }
    return(
        <div className="pageSelector">
            {pageSelectors(pagesNum)}
        </div>
    )
}