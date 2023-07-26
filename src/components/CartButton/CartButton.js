import React, { useContext, useState, useEffect } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import './CartButton.css';
import CartContext from '../../store/cart-context';

function CartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `button ${btnIsHighlighted ? 'bump' : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onCartClick}>
      <span className="icon">
        <BsFillCartFill />
      </span>
      <span>Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
}
export default CartButton;
