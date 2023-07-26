import React, { useContext, useState } from 'react';
import './Cart.css';
import Modal from '../Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from '../CartItem/CartItem';
import Checkout from '../Checkout/Checkout';

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartRemoveItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartAddItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://food-app-479ae-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartRemoveItemHandler.bind(null, item.id)}
          onAdd={cartAddItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const isSubmittingContent = <p>Sending order data...</p>;
  const didSubmitContent = (
    <>
      <p>Successfully sent the order</p>
      <div className="actions-success">
        <button className="button" onClick={props.onCartClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onCartClose={props.onCartClose}>
      {!isSubmitting && !didSubmit && (
        <>
          {cartItems}
          <div className="total">
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout
              onCancel={props.onCartClose}
              onConfirm={submitOrderHandler}
            />
          )}
          {!isCheckout && (
            <div className="actions">
              <button className="button-alt" onClick={props.onCartClose}>
                Close
              </button>
              {hasItems && (
                <button className="button" onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
}

export default Cart;
