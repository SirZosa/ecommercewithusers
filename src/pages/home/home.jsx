import Main from './main.jsx'
import PromoSection from './promoSection.jsx'
import Featured from './Featured.jsx'
import Card from '../../components/Card/index.jsx'
import Perks from './perks.jsx'
import picture from '../../assets/ropa.webp'
import MobileBtn from '../../components/buttons/MobileButtons/MobileBtn.jsx'


export default function Home(){
    return(
    <div className='home'>
      <Main/>
      <PromoSection/>
      <Featured/>
      <Card pic={picture} className='popi'>
            <Card.H3>20% Off On Tank Tops</Card.H3>
            <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.</Card.Text>
            <MobileBtn color="solid">SHOP NOW!</MobileBtn>
        </Card>
      <Perks/>
    </div>
    )
}