import { logo } from "@/assets";
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
          {/* <div className='social-media'>
            <div className='social-media-icon-div'>
              <img src={Images.facebook} alt="facebook image"/>
            </div>
            <div className='social-media-icon-div'>
              <img src={Images.twiitter} alt="twitter image"/>
            </div>
            <div className='social-media-icon-div'>
              <img src={Images.instagram} alt="instagram image"/>
            </div>
            <div className='social-media-icon-div'>
              <img src={Images.youtube} alt="youtube image"/>
            </div>
          </div> */}
        </div>
        <div className='app__footer-upper-elements'>
          <p className='title'>My Account</p>
          <div className='links'>
            <a href='#'>My Account</a>
            <a href='#'>Contact</a>
            <a href='#'>Shop</a>
            <a href='#'>Shopping Cart</a>
            <a href='#'>Services Login</a>
          </div>
        </div>
        <div className='app__footer-upper-elements'>
          <p className='title'>Services</p>
          <div className='links'>
            <a href='#'>Delivery</a>
            <a href='#'>Warrenty</a>
            <a href='#'>Build</a>
            <a href='#'>Shopping Cart</a>
            <a href='#'>Services Login</a>
          </div>
        </div>
        <div className='app__footer-upper-elements'>
          <p className='title'>Contact Info</p>
          <div className='Info'>
            <p>Address : 142/1/1 Kotugoda rd, Mukalangamuwa, Seeduwa</p>
            <p>Phone : +94(0) 741002005</p>
            <p>email : crp@gmail.com</p>
            <p>crp.lk</p>
          </div>
        </div>
      </div>
      <div className='app__footer-lower-section'>
        <p>Ceylon Rich Products © 2024</p>
      </div>
    </div>

    </div>
  )
}

export default Footer;