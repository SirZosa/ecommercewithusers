import {useState, useEffect} from "react"
import Dexie from 'dexie'
import { v4 as uuidv4 } from 'uuid'
import LoadingCard from "../../components/loadingCard/loadingCard.jsx"
import ItemCard from "../../components/itemCard/itemCard.jsx"
import Modal from "../../components/modal/modal.jsx"
import ConfirmationCard from "../../components/confirmationCard/index.jsx"
import { useParams, Link } from "react-router-dom"
import getUserInfo from "../../utils/getUserInfo.js"


export default function ProductPage(){
    const params = useParams()
    const productId = params.id
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState([])
    const [colorActive, setColorActive] = useState(null)
    const [sizeActive, setSizeActive] = useState(null)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [displayCard, setDisplayCard] = useState(false)
    const [loading, setLoading] = useState(false)
    const [finishLoading, setFinishLoading] = useState(false)
    const [user, setUser] = useState(null)
    const db = new Dexie('StoreItems')
    db.version(1).stores({
        items: "orderId, productId, name,color, size, price, quantity, subtotal, img"
    })

    const colors = ['red', 'blue', 'green']
    const sizes = ['small', 'medium', 'large', 'extra large']

    useEffect(()=>{
        getUserInfo({next:setUser})
    },[])

    useEffect(()=>{
        async function fetchData() {
            try {
              const firstResponse = await fetchFirstData();
              setProduct(firstResponse);
      
              const secondResponse = await fetchSecondData(firstResponse);
              setCategory(secondResponse);
            } 
            catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          fetchData()
    },[productId])
    

    async function fetchFirstData() {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching first data:', error);
          throw error;
        }
      }
      
      async function fetchSecondData(firstData) {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/category/${firstData.category}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching second data:', error);
          throw error;
        }
      }

    function addItem(e) {
        e.preventDefault()
        if(colorActive === null || sizeActive === null || itemQuantity <= 0) return alert('select a color, size and valid quantity please.')
        setDisplayCard(true)
    }

    function confirmation() {
        setLoading(true)
        setDisplayCard(false)
            
            const orderId = uuidv4()
            const name = product.title
            const color = colors[colorActive]
            const size = sizes[sizeActive]
            const price = product.price
            const quantity = itemQuantity
            const subtotal = product.price * itemQuantity
            const img = product.image
        
        if(!user){
            db.items.add({
                orderId,
                productId,
                name,
                color,
                size,
                price,
                quantity, 
                subtotal, 
                img
            })
        }
        else{
            const token = localStorage.getItem("myEcommerceToken")
            if(token){
            async function fetchData(){
                try{
                    const response = await fetch('https://ecommerceapi-susm.onrender.com/v1/cart',{
                        method:"POST",
                        headers:{
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify({
                            orderId,
                            productId,
                            name,
                            color,
                            size,
                            price,
                            quantity:Number(quantity), 
                            subtotal, 
                            img
                        })
                      })
                if(response.status === 200){
                    console.log("product added")
                }
                if(response.status === 400){
                    localStorage.removeItem("myEcommerceToken")
                    return false
                }
                }
                catch(e){
                console.log(e)
                }
            }
            fetchData()
            }
        }
            setTimeout(() => {
                setLoading(false)
                setFinishLoading(true)
            }, 1000)
    }
    

    const productCards = category?.map(productCategory => {
        if(productCategory.id === Number(productId)) return 
        else {
            return(
                <ItemCard key={productCategory.id}>
                    <Link to={`/product/${productCategory.id}`}>
                    <ItemCard.Image src={productCategory.image}/>
                    <ItemCard.Info title={productCategory.title} gender={productCategory.category} price={productCategory.price} rate={productCategory.rating.rate}/>
                </Link>
                </ItemCard>
            )

        }
    })

    function productPages(){
        const productsInPage = []
        let limit = productCards.length < 4 ? productCards.length : 5
        for(let i=0; i < limit; i++){
            if(productCards[i]){
                productsInPage.push(productCards[i])
            }
        }
        return productsInPage
    }

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

    function renderProduct(){
        if(!product){
            return <LoadingCard className="product-loadingCard"/>
        }
        else{
            return(
            <>
                <section className="productPage">
                    <img src={product.image} alt="product image" />
                    <Link className='homeLink' to='/'>Home</Link> 
                    <Link to={`/category/${product.category === `women's clothing`? 'women': product.category === `men's clothing`? 'men': 'jewelery'}`}>{product.category}</Link>
                    <h1>{product.title}</h1>
                    <h3>${product.price}</h3>
                    <p>{product.description}.</p>
                    <div className="product-options">
                        <div className="product-color-options">
                            <div onClick={() => setColorActive(0)} className={colorActive===0? "product-color red active-color": 'product-color red'}></div>
                            <div onClick={() => setColorActive(1)} className={colorActive===1? "product-color blue active-color": 'product-color blue'}></div>
                            <div onClick={() => setColorActive(2)} className={colorActive===2? "product-color green active-color": 'product-color green'}></div>
                        </div>
                        <div className="product-size-options">
                            <div onClick={()=> setSizeActive(0)}className={sizeActive === 0 ? 'product-size active-size':'product-size'}>S</div>
                            <div onClick={()=> setSizeActive(1)}className={sizeActive === 1 ? 'product-size active-size':'product-size'}>M</div>
                            <div onClick={()=> setSizeActive(2)}className={sizeActive === 2 ? 'product-size active-size':'product-size'}>L</div>
                            <div onClick={()=> setSizeActive(3)}className={sizeActive === 3 ? 'product-size active-size':'product-size'}>XL</div>
                        </div>
                    </div>
                    <div className="addToCart">
                        <form className="cartForm" onSubmit={addItem}>
                            <input name='quantity' className="product-quantity" type="number" value={itemQuantity} onChange={(e)=> setItemQuantity(e.target.value)}/>
                            <button className="cartBtn">ADD TO CART</button>
                        </form>
                    </div>
                </section>
                <section className="related-products">
                    <h3>Related products</h3>
                    <div className="featured">
                        <div className="Featured-products">
                            {productCards ? productPages() : loadingCards()}
                        </div>
                    </div>
                </section>
            </>
            )
        }
    }

    return(
        <>
        {renderProduct()}
        {loading ? 
        <Modal>
            <ConfirmationCard>
                <div className="loader"></div>
                <div className="lds-dual-ring"></div>
            </ConfirmationCard>
        </Modal> : displayCard ? 
        <Modal>
            <ConfirmationCard>
                <ConfirmationCard.Top>Confirm order?</ConfirmationCard.Top>
                <ConfirmationCard.Boolean yes={confirmation} no={()=>setDisplayCard(false)}/>
            </ConfirmationCard>
        </Modal> : finishLoading ? 
        <Modal>
        <ConfirmationCard>
            <ConfirmationCard.Top>Order in cart!</ConfirmationCard.Top>
            <Link to='/cart'>Go to cart</Link>
            <button onClick={()=> setFinishLoading(false)}>Close</button>
        </ConfirmationCard>
        </Modal> : ''}
        </>
    )
}