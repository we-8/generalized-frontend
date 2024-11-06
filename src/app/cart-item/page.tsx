import React from 'react';
import '../../styles/main-pages-css/Cart.css'
import { TitleL,RemoveButton ,CheckOut,BackToShop} from '@/components';
import { Cashew } from '@/assets';
import Image from 'next/image';

const Cart = () => {

  const Cartitem =[
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    },
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    },
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    },
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    },
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    },
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    },
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    },
    {
      name:'Lorem ipsum dolor sit ',
      description:'amet, adipiscing  incididunt ut labore et dolor',
      total:'$ 450.00',
      per_item:'$ 150.00',
      image:Cashew
    }
  ]
  return (
    <div className='app__cart--main-div'>
      <TitleL title='Your shopping cart' />
      <div className='app__cart--details-main-div'>
        <div></div>
        <div className='app__cart--product-details'>
          <div className='app__cart--ordered-items'>
            {Cartitem.map((item,index)=>(
              <div className='cart-item-card' key={index}>
                <div className='cart-item'>
                <div className='cart-item-details'>
                  <Image className='cart-item-img' src={item.image} alt="cart item image"/>
                  <div>
                    <p className='cart-item-title'>{item.name}</p>
                    <p className='cart-item-des'>{item.description}</p>
                  </div>
                </div>
                <div>
                <div className='cart-dropdown'>
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                </div>
                <div className='cart-item-prices'>
                  <p className='cart-item-total-price'>{item.total}</p>
                  <p className='cart-item-singel-price'>{item.per_item} / per item</p>
                </div>
                <RemoveButton title="Remove" />
                </div>
                <div className='item-line'/>
              </div>
            ))}
          </div>
          <div className='app__cart--product-summary'>
            <div className='summary-total-value-div'>
              <p className='summary-total-value-label'>Total price:</p>
              <p className='summary-total-value'>$450.00</p>
            </div>
            <div className='summary-discount-value-div'>
              <p className='summary-discount-value-label'>Discount:</p>
              <p className='summary-total-value'>$150.00</p>
            </div>
            <div className='summary-shipping-value-div'>
              <p className='summary-shipping-value-label'>Shipping cost:</p>
              <p className='summary-shipping-value'>$50.00</p>
            </div>
            <div className='summary-line'/>
            <div className='summary-shipping-value-div'>
              <p className='summary-shipping-value-label'>Total price:</p>
              <p className='summary-shipping-value'>$50.00</p>
            </div>
            <div className='checkout-buttons'>
              <CheckOut title='Proceed to Checkout'/>
              <BackToShop title='Skip to Shop' />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart;