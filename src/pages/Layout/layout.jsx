import { Outlet } from 'react-router-dom'
import MobileNav from '../../components/Navbar/MobileNav/MobileNav.jsx'
import Ad from '../home/Ad.jsx'
import Links from '../home/links.jsx'
import Footer from '../home/footer.jsx'

export default function Layout({token}){
    return(
        <>
            <MobileNav token={token}/>
            <Outlet/>
            <Ad/>
            <Links />
            <Footer/>
        </>
    )
}