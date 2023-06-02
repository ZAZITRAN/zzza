import React from 'react'
import "./Footer.scss"
import { SocialIcon } from 'react-social-icons';
function Footer() {
    return ( 
    <div className='footer'>
            <p className='footer-text'> CONTACT US</p>
        <div className='footer-contact'>
            <div className='footer-contact-box'>
                <p >📞 01234567890</p>
                <span> 🏪 No 18, Nguyen Trai Street, Thanh Xuan, Ha Noi</span>
            </div>
            <div className='footer-contact-social'>
            
            <SocialIcon className='footer-contact-social-ttIcon' url='https://twitter.com/jaketrent'/>
            <SocialIcon  className='footer-contact-social-fbIcon' url='https://facebook.com/zazitran'/>
            </div>
        </div>
    </div> );
}

export default Footer;