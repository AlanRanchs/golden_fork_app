import React, {useContext} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

export const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <form className='placeorder-order'>
      <div className="place-order-left">
        <p className="title">Información de entrega</p>
        <div className="multi-fields">
          <input type="text" placeholder='Nombres' />
          <input type="text" placeholder='Apellidos' />
        </div>
        <input type="email" placeholder='Correo electrónico' />
        <input type="text" placeholder='Calle' />
        <div className="multi-fields">
          <input type="text" placeholder='Ciudad' />
          <input type="text" placeholder='Estado' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Código postal' />
          <input type="text" placeholder='País' />
        </div>
        <input type="text" placeholder='Número de teléfono' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Total de compra</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Entrega gratis:</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button>PAGAR</button>
        </div>
      </div>
    </form>
  )
}
