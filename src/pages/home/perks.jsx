import { IoEarthOutline } from "react-icons/io5";
import { TbClothesRack } from "react-icons/tb";
import { TbReportMoney } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";
import TransparentCard from '../../components/transparentCard/index.jsx'

export default function Perks(){
    return(
        <section className="perks">
            <TransparentCard>
                <TransparentCard.Icon><IoEarthOutline/></TransparentCard.Icon>
                <TransparentCard.Title>Worldwide Shipping</TransparentCard.Title>
                <TransparentCard.Text>Free shipping on all orders over $100</TransparentCard.Text>
            </TransparentCard>
            <TransparentCard>
                <TransparentCard.Icon><TbClothesRack/></TransparentCard.Icon>
                <TransparentCard.Title>Best Quality</TransparentCard.Title>
                <TransparentCard.Text>We only sell the best quality products.</TransparentCard.Text>
            </TransparentCard>
            <TransparentCard>
                <TransparentCard.Icon><TbReportMoney/></TransparentCard.Icon>
                <TransparentCard.Title>Best Offers</TransparentCard.Title>
                <TransparentCard.Text>We offer competitive prices on our 100% selling products.</TransparentCard.Text>
            </TransparentCard>
            <TransparentCard>
                <TransparentCard.Icon><GrSecure/></TransparentCard.Icon>
                <TransparentCard.Title>Secure Payments</TransparentCard.Title>
                <TransparentCard.Text>We accept payments with Secure Payments.</TransparentCard.Text>
            </TransparentCard>
        </section>
    )
}