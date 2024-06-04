import MobileBtn from '../../components/buttons/MobileButtons/MobileBtn.jsx'

export default function Main(){
    return(
        <section className="Main">
            <div className="Main-inside">
                <h1>Lorem ipsum, dolor sit amet.</h1>
                <h2>25% Discount on all Products!</h2>
                <div className="mainLinks">
                <MobileBtn color="solid" url='/category/everything'>SHOP NOW!</MobileBtn>
                <MobileBtn color="transparent" url='/category/everything'>FIND MORE</MobileBtn>
                </div>
            </div>
        </section>
    )
}