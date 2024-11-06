import React from 'react';
import '../../styles/main-pages-css/Cart.css'
import { TitleL } from '@/components';
import { Cashew } from '@/assets';

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
    }
  ]
  return (
    <div className='app__cart--main-div section__padding'>
      <TitleL title='Your shopping cart' />
      <div className='app__cart--details-main-div'>
        <div></div>
        <div className='app__cart--product-details'>
          <div className='app__cart--ordered-items'></div>
        </div>
      </div>

    </div>
  )
}

export default Cart;