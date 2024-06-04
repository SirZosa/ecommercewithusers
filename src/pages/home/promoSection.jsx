import Card from '../../components/Card/index.jsx'
import picture from '../../assets/ropa.webp'
import MobileBtn from '../../components/buttons/MobileButtons/MobileBtn.jsx'
export default function PromoSection() {
    return(
        <section className="Promos">
            <Card pic={picture}>
                <Card.H3>20% Off On Tank Tops</Card.H3>
                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</Card.Text>
                <MobileBtn color="solid">SHOP NOW!</MobileBtn>
            </Card>
            <Card pic={picture}>
                <Card.H3>20% Off On Tank Tops</Card.H3>
                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</Card.Text>
                <MobileBtn color="solid">SHOP NOW!</MobileBtn>
            </Card>
            <Card pic={picture}>
                <Card.H3>20% Off On Tank Tops</Card.H3>
                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</Card.Text>
                <MobileBtn color="solid">SHOP NOW!</MobileBtn>
            </Card>
        </section>
        
    )
}