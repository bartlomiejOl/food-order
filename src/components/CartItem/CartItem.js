import './CartItem.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className="cart-item">
      <div>
        <h2>{props.name}</h2>
        <div className="summary-cart">
          <span className="price-cart">{price}</span>
          <span className="amount-cart">{props.amount}</span>
        </div>
      </div>
      <div className="actions-cart">
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
