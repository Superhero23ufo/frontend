import React from "react";
import './Footer.css'
import footer_logo from '../Asset/logo_big.png'
import Instagram_icon from '../Asset/instagram_icon.png'
import pintester_icon from '../Asset/pintester_icon.png'
import whatsapp_icon from '../Asset/whatsapp_icon.png'
const Footer = () => {
    return(
            <div className="footer">
                <div className="footer-logo">
                    <img src={footer_logo} alt="" />
                    <p>SHOPPER</p>
                </div>
                <ul className="footer-links">
                    <li>Company</li>
                    <li>Products</li>
                    <li>Offices</li>
                    <li>About</li>
                    <li>Contact</li>
                    
                </ul>
                <div className="footer-social-icon">
                    <div className="footer-icons-container">
                        <img src={Instagram_icon} alt="" />
                    </div>
                    <div className="footer-icons-container">
                        <img src={pintester_icon} alt="" />
                    </div>
                    <div className="footer-icons-container">
                        <img src={whatsapp_icon} alt="" />
                    </div>
                </div>
                <div className="footer-copyright">
                    <hr/>
                    <p>Copyright @ 2024 - All Right Reserved To My Dead Rat</p>
                </div>
            </div>

    )
}

export default Footer;