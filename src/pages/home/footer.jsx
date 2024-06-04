import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";


export default function Footer(){
    return(
        <footer>
           <p>
            Copyright © 2024 Omar Sosa. 
            </p>
            <div className="socialMedia">
                <a href="https://github.com/SirZosa" className="social-icon" target="_blank"><FaGithub/></a>
                <a href="https://www.linkedin.com/in/omar-sosa-b5949a247/" className="social-icon" target="_blank"><FaLinkedin/></a>
                <a href="https://youtube.com/@omarsosa8622?si=pGw7cBXYy9YOS4EP" className="social-icon" target="_blank"><FaYoutube/></a>
                <a href="mailto:omar.sosa.quimica@gmail.com" className="social-icon" target="_blank"><FaGoogle/></a>
            </div>
        </footer>
    )
}