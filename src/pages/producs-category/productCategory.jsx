import React from "react"
import { useParams, Link, useSearchParams } from "react-router-dom"
import ItemCard from '../../components/itemCard/index.jsx'
import LoadingCard from '../../components/loadingCard/loadingCard.jsx'
import PageSelector from "../../components/pageSelector/pageSelector.jsx"

export default function ProductsCategory(){
    const params = useParams()
    const category = params.id === 'women' ? `category/women's clothing` : params.id === 'men' ? `category/men's clothing` : params.id === 'jewelery' ? "category/jewelery" : ""
    const page = params.pageNum === null ? 1: params.pageNum
    const [products, setProducts] = React.useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const filterValue = searchParams.get("sort")

    React.useEffect(()=>{
        setProducts(null)
        fetch(`https://fakestoreapi.com/products/${category}`)
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[params.id])

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
          if (value === null) {
            prevParams.delete(key)
          } else {
            prevParams.set(key, value)
          }
          return prevParams
        })
      }

    function sortProducts(arr, sortOption){
        if(!filterValue) return arr
        switch (sortOption){
            case 'Default':
                return arr?.sort((a,b)=> a.id - b.id)
            case 'Popularity':
                return arr?.sort((a, b) => a.rating.count - b.rating.count)
            case 'LowToHigh':
                return arr?.sort((a,b)=> a.price - b.price)
            case 'HighToLow':
                return arr?.sort((a,b)=> b.price-a.price)
            case 'Rating':
                return arr?.sort((a, b) => b.rating.rate - a.rating.rate)
        }
    }

    const productCards = sortProducts(products, filterValue)?.map(product => {
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
                <LoadingCard/>
                <LoadingCard/>
            </div>
        )
    }

    function productPages(page){
        let pageNum = page ? page : 1
        let productsInPage = []
        for(let i=(pageNum * 6) - 6; i< (pageNum * 6); i++){
            productsInPage.push(productCards[i])
        }
        return productsInPage
    }

    return(
        <section className="category">
            <div className="categoryHeader">
                <Link to='/'>Home</Link> 
                <h1>{params.id === 'women'? 'Women': params.id === 'men' ? 'Men' : params.id === 'jewelery' ? 'Jewelery': 'Everything'}</h1>
                <label htmlFor="sort-options">Sort by:</label>
                <select name="sort-options" onChange={(e)=>handleFilterChange('sort',e.target.value)}>
                <option value="Default">Default</option>
                    <option  value="Popularity">Popularity</option>
                    <option  value="LowToHigh">Price:Low to high</option>
                    <option  value="HighToLow">Price: High to low</option>
                    <option  value="Rating">Rating</option>
                </select>
            </div>
            <div className="featured">
                <div className="Featured-products">
                    {productCards ? productPages(page) : loadingCards()}
                </div>
            </div>
            {productCards? <PageSelector ItemCount={products.length}/>: <h2>loading</h2>}
        </section>

    )
}