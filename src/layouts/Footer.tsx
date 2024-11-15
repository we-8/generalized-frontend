import { logo,Tiktok,Youtube,Instagram,Facebook } from "@/assets";
import Image from 'next/image';
import '../styles/layouts-css/Footer.css'

const Footer = () => {

  return (
    <div className='app__footer--main-div'>
       <div className='app__footer-main_div section__padding'>
      <div className='app__footer-upper-section'>
         <div className='app__footer-upper-elements'>
          <Image src={logo} alt="logo"/>
          <p className='description'>To deliver an outstanding quality service that: Customers are satisfied with and recommend to friends and family.
          We care your dreams.</p>
          <div className='social-media'>
            <div className='social-media-icon-div'>
              <Image src={Youtube} alt="youtube image"/>
            </div>
            <div className='social-media-icon-div'>
              <Image src={Instagram} alt="instagram image"/>
            </div>
            <div className='social-media-icon-div'>
              <Image src={Tiktok} alt="tiktok image"/>
            </div>
            <div className='social-media-icon-div'>
              <Image src={Facebook} alt="facebook image"/>
            </div>
          </div>
        </div>
        <div className='app__footer-upper-elements'>
          <p className='footer-title'>My Account</p>
          <div className='links'>
            <a href='#'>My Account</a>
            <a href='#'>Contact</a>
            <a href='#'>Shop</a>
            <a href='#'>Shopping Cart</a>
            <a href='#'>Services Login</a>
          </div>
        </div>
        <div className='app__footer-upper-elements'>
          <p className='footer-title'>Services</p>
          <div className='links'>
            <a href='#'>Delivery</a>
            <a href='#'>Warrenty</a>
            <a href='#'>Build</a>
            <a href='#'>Shopping Cart</a>
            <a href='#'>Services Login</a>
          </div>
        </div>
        <div className='app__footer-upper-elements'>
          <p className='footer-title'>Contact Info</p>
          <div className='Info'>
            <p>Address : 142/1/1 Kotugoda rd, Mukalangamuwa, Seeduwa</p>
            <p>Phone : +94(0) 741002005</p>
            <p>email : crp@gmail.com</p>
            <p>crp.lk</p>
          </div>
        </div>
      </div>
      <div className="footer-line"/>
      <div className='app__footer-lower-section'>
        <p className="lower-section-p1">Ceylon Rich Products © 2024</p>
        <p className="lower-section-p2">Designed & developed We8</p>
      </div>
    </div>

    </div>
  )
}

export default Footer;