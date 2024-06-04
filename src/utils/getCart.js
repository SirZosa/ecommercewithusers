export default function getCart({next}){
    const token = localStorage.getItem("myEcommerceToken")
    if(token){
      async function fetchData(){
        try{
          const response = await fetch('http://localhost:1234/v1/cart',{
            method:"GET",
            headers:{"Authorization": `Bearer ${token}`}
          })
          if(response.status === 200){
            const data = await response.json()
            next(data)
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