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
              <a href="https://www.instagram.com/ceylonrichproducts__?igsh=cDJ6b2pzMDgxZmNz" target="_blank" rel="noopener noreferrer">
                <Image src={Instagram} alt="instagram image"/>
              </a>
            </div>
            <div className='social-media-icon-div'>
              <a href="https://www.tiktok.com/@ceylon_rich_products?_t=ZS-909QH04laEC&_r=1" target="_blank" rel="noopener noreferrer">
                <Image src={Tiktok} alt="tiktok image"/>
              </a>
            </div>
            <div className='social-media-icon-div'>
              <a href="https://www.facebook.com/share/1BWsz1UhKu/" target="_blank" rel="noopener noreferrer">
                <Image src={Facebook} alt="facebook image"/>
              </a>
            </div>
          </div>
        </div>
        <div className='app__footer-upper-elements'>
          <p className='footer-title'>Quick Links</p>
          <div className='links'>
            <ul>
              <li>
              <a href="/contact-us">Contact</a>
            </li>
            <li>
              <a href="/product">Shop</a>
            </li>
            <li>
              <a href="/cart-item">Shopping Cart</a>
            </li>
            </ul>
          </div>
        </div>
        <div className='app__footer-upper-elements'>
          <p className='footer-title'>Contact Info</p>
          <div className='Info'>
            <p>Address : S.K CINEMA BUILDING, Matara 81000</p>
            <p>Phone : +94(0) 702182114</p>
            <p>email : crp@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="footer-line"/>
      <div className='app__footer-lower-section'>
        <p className="lower-section-p1">Ceylon Rich Products © 2025</p>
        <p className="lower-section-p2">Designed & developed We8</p>
      </div>
    </div>

    </div>
  )
}

export default Footer;