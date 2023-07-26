import React from 'react';
import './Header.css';
import mealsImg from '../../assets/images/meals.jpg';
import CartButton from '../CartButton/CartButton';

function Header(props) {
  return (
    <>
      <header className="header">
        <h1>FoodOrder</h1>
        <CartButton onCartClick={props.onShowCart} />
      </header>
      <div className="main-image">
        <img src={mealsImg} alt="Delicious food" />
      </div>
    </>
  );
}

export default Header;
