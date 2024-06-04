import React from "react"
import ItemCard from '../../components/itemCard/index.jsx'
import LoadingCard from '../../components/loadingCard/loadingCard.jsx'
import { Link } from "react-router-dom"

export default function Featured(){
    const [products, setProducts] = React.useState(null)
    React.useEffect(()=>{
        fetch('https://fakestoreapi.com/products?limit=8')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

    const productCards = products?.map(product=>{
        return(
            <ItemCard key={product.id}>
                <Link to={`/product/${product.id}`}>
                    <ItemCard.Image src={product.image}/>
                    <ItemCard.Info title={product.title} gender={product.category} price={product.price} rate={product.rating.rate}/>
                </Link>
                </ItemCard>
        )
    })

    const loadingCards = () =>{
        return (
            <div className="Featured-products">
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
            </div>
        )
    }

    return(
            <section className="Featured">
                <h3>Featured Products</h3>
                <div className="Featured-products">
                    {productCards ? productCards : loadingCards()}
                </div>
            </section>
    )
}